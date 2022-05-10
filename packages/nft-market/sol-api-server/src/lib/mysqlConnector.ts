import mysql from 'mysql2';

class MySQLConnector {
    internalPool;

    get SOLANA_API_MYSQL_USER() { return process.env.SOLANA_API_MYSQL_USER; }
    get SOLANA_API_MYSQL_DATABASE() { return process.env.SOLANA_API_MYSQL_DATABASE; }
    get SOLANA_API_MYSQL_PASSWORD() { return process.env.SOLANA_API_MYSQL_PASSWORD; }
    get SOLANA_API_MYSQL_HOST() { return process.env.SOLANA_API_MYSQL_HOST; }
    get SOLANA_API_MYSQL_DB_POOL_SIZE() { return process.env.SOLANA_API_MYSQL_DB_POOL_SIZE; }

    constructor() {
        //Instantiates the connection pool
        this.internalPool = mysql.createPool({
            host: this.SOLANA_API_MYSQL_HOST,
            user: this.SOLANA_API_MYSQL_USER,
            database: this.SOLANA_API_MYSQL_DATABASE,
            password: this.SOLANA_API_MYSQL_PASSWORD,
            connectionLimit: Number(this.SOLANA_API_MYSQL_DB_POOL_SIZE),
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
