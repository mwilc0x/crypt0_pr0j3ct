const fs = require('fs');
const mysql = require('mysql2');
require('dotenv/config');

main();

async function main() {
    console.log('howdy from nodejs land');
    console.log(process.env);

    const eventData = await readFile(process.env.GITHUB_EVENT_PATH);
    console.log(eventData);
    const connector = new MySQLConnector();
}

function readFile(path) {
    return new Promise((resolve) => {
        try {
            fs.readFile(path, {}, (err, data) => {
                if (err) {
                    console.log(err);
                    resolve([]);
                    return;
                }
                const json = JSON.parse(data.toString());
                resolve(json);
            });
        } catch (error) {
            console.log(error);
            resolve([]);
        }
    });
}

class MySQLConnector {
    internalPool;

    get SOLANA_API_MYSQL_USER() { return process.env.MYSQL_USER; }
    get SOLANA_API_MYSQL_DATABASE() { return process.env.MYSQL_DATABASE; }
    get SOLANA_API_MYSQL_PASSWORD() { return process.env.MYSQL_PASSWORD; }
    get SOLANA_API_MYSQL_HOST() { return process.env.MYSQL_HOST; }

    constructor() {
        //Instantiates the connection pool
        this.internalPool = mysql.createPool({
            host: this.SOLANA_API_MYSQL_HOST,
            user: this.SOLANA_API_MYSQL_USER,
            database: this.SOLANA_API_MYSQL_DATABASE,
            password: this.SOLANA_API_MYSQL_PASSWORD,
            waitForConnections: true
        });

        //Allows better control of openned connections
        this.registerThreadCounter()
    }

    /**
     * 
     * Registers an event lister to capture when new connections are oppened
     * This method uses console.log, but in an production environment you'd probably
     * use a async log write such as winston since console.log is blocking
     * 
     */
    registerThreadCounter() {
        this.internalPool.on('connection', (connection) => console.log(`New connection stablished with server on thread #${connection.threadId}`))
    }

    /**
     * 
     * Retrieves the connection pool
     * 
     */
    get pool() {
        return this.internalPool;
    }
}

class MySQLWrapper {
    
    /**
     * 
     * Queries the database
     * @param {String} query - The query itself
     * @param {Array} params - The parameters to be passed to MySQL
     * @returns {Promise} - A promise to a query result
     * 
     */
    static createQuery({ query, params }) {
        return new Promise((succeed, fail) => {
            mySQLConnector.pool.getConnection((err, connection) => {
                if (err) {
                    return fail(err);
                }
                connection.query(query, params, (err, rows) => {
                    connection.release();
                    if (err) {
                        return fail(err);
                    }
                    return succeed(rows);
                });
            });
        });
    }

    /**
     * 
     * Runs a transactional query
     * @param {MySQL.Connection} connection - The connection whose transaction will be used
     * @param {String} query - The query itself
     * @param {Array} params - The parameters to be passed to MySQL
     * @returns {Promise} - A promise to a query result
     * 
     */
    static createTransactionalQuery({ query, params, connection }) {
        return new Promise((succeed, fail) => {
            connection.query(query, params, (err, rows) => {
                if (err) {
                    return fail(err);
                }
                return succeed(rows);
            });
        });
    }
    
    /**
     * 
     * Rollbacks a transaction
     * @param {MySQL.Connection} connection - The connection whose transaction will be rollbacked
     * @returns {Promise} - A promise to the rollback
     * 
     */
    static rollback(connection) {
        return new Promise((succeed, fail) => {
            try {
                connection.rollback(() => {
                    return succeed();
                });
            } catch (e) {
                return fail(e);
            } finally {
                connection.release();
            }
        });
    }

    /**
     * 
     * Commits a transaction
     * @param {MySQL.Connection} connection - The connection whose transaction will be commited
     * @returns {Promise} - A promise to the commit
     * 
     */
    static commit(connection) {
        return new Promise((succeed, fail) => {
            try {
                connection.commit(err => { 
                    if (err) { 
                        return this.rollback(connection);
                    }
                    return succeed();
                })
            } catch (e) {
                return fail(e);
            } finally {
                connection.release();
            }

        })

    }

    /**
     * 
     * Retrieves a connection from the pool to be used in transactions
     * @param {MySQL.Connection} connection - A connection from the pool
     * 
     */
    static getConnectionFromPool() {
        return new Promise((succeed, fail) => {
            mySQLConnector.pool.getConnection((err, connection) => {
                if (err) {
                    return fail(err);
                }
                return succeed(connection);
            });
        });
    }

    /**
     * 
     * Begins a new transaction in a connection
     * @param {MySQL.Connection} connection - A connection from the pool
     * 
     */
    static beginTransaction(connection) {
        return new Promise((succeed, fail) => {
            connection.beginTransaction(err => {
                if (err) {
                    return fail(err);
                }
                return succeed(connection);
            });
        });
    }
}
