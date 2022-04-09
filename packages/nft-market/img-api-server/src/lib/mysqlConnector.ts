import mysql from 'mysql2';

class MySQLConnector {
    internalPool;

    get IMAGE_API_MYSQL_USER() { return process.env.IMAGE_API_MYSQL_USER; }
    get IMAGE_API_MYSQL_DATABASE() { return process.env.IMAGE_API_MYSQL_DATABASE; }
    get IMAGE_API_MYSQL_PASSWORD() { return process.env.IMAGE_API_MYSQL_PASSWORD; }
    get IMAGE_API_MYSQL_HOST() { return process.env.IMAGE_API_MYSQL_HOST; }
    get IMAGE_API_MYSQL_DB_POOL_SIZE() { return process.env.IMAGE_API_MYSQL_DB_POOL_SIZE; }

    constructor() {
        //Instantiates the connection pool
        this.internalPool = mysql.createPool({
            host: this.IMAGE_API_MYSQL_HOST,
            user: this.IMAGE_API_MYSQL_USER,
            database: this.IMAGE_API_MYSQL_DATABASE,
            password: this.IMAGE_API_MYSQL_PASSWORD,
            connectionLimit: Number(this.IMAGE_API_MYSQL_DB_POOL_SIZE),
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
