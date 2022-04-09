import mysql from 'mysql2';

class MySQLConnector {
    internalPool;

    get WEB_SERVER_MYSQL_USER() { return process.env.WEB_SERVER_MYSQL_USER; }
    get WEB_SERVER_MYSQL_DATABASE() { return process.env.WEB_SERVER_MYSQL_DATABASE; }
    get WEB_SERVER_MYSQL_PASSWORD() { return process.env.WEB_SERVER_MYSQL_PASSWORD; }
    get WEB_SERVER_MYSQL_HOST() { return process.env.WEB_SERVER_MYSQL_HOST; }
    get WEB_SERVER_MYSQL_DB_POOL_SIZE() { return process.env.WEB_SERVER_MYSQL_DB_POOL_SIZE; }

    constructor() {
        //Instantiates the connection pool
        this.internalPool = mysql.createPool({
            host: this.WEB_SERVER_MYSQL_HOST,
            user: this.WEB_SERVER_MYSQL_USER,
            database: this.WEB_SERVER_MYSQL_DATABASE,
            password: this.WEB_SERVER_MYSQL_PASSWORD,
            connectionLimit: Number(this.WEB_SERVER_MYSQL_DB_POOL_SIZE),
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

export default new MySQLConnector();
