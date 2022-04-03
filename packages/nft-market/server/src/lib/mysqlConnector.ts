import mysql from 'mysql2';

class MySQLConnector {
    internalPool;

    get MYSQL_USER() { return process.env.MYSQL_USER || 'root'; }
    get MYSQL_DATABASE() { return process.env.MYSQL_DATABASE || 'nft'; }
    get MYSQL_PASSWORD() { return process.env.MYSQL_PASSWORD || ''; }
    get MYSQL_HOST() { return process.env.MYSQL_HOST || 'localhost'; }
    get MYSQL_DB_POOL_SIZE() { return process.env.MYSQL_DB_POOL_SIZE || 10; }

    constructor() {
        //Instantiates the connection pool
        this.internalPool = mysql.createPool({
            host: this.MYSQL_HOST,
            user: this.MYSQL_USER,
            database: this.MYSQL_DATABASE,
            password: this.MYSQL_PASSWORD,
            connectionLimit: Number(this.MYSQL_DB_POOL_SIZE),
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
