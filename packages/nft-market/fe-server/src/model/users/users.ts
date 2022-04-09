import { DAO, mySQLWrapper } from '../../lib';

export default class User extends DAO {

    /**
     * Overrides TABLE_NAME with this class' backing table at MySQL
     */
    static get TABLE_NAME() {
        return 'users';
    }

    /**
     * Returns a user by its Ethereum Address
     */
    static async getByEthAddress(_, { ethereum_key }) {
        return await this.find(ethereum_key);
    }

    /**
     * Returns a list of users matching the passed fields
     * @param {*} fields - Fields to be matched
     */
    static async findMatching(_, fields) {
        // Returns early with all users if no criteria was passed
        if (Object.keys(fields).length === 0) {
            return this.findAll();
        }
        
        // Find matching users
        return this.findByFields({
            fields
        });
    }

    /**
     * Creates a new user
     */
    static async createEntry(_, { username, ethereum_key }) {
        const connection: any = await mySQLWrapper.getConnectionFromPool();
        try {
            let _result: any = await this.insert(connection, {
                data: {
                    ethereum_key,
                    username
                }
            });

            return this.getByEthAddress(_, { ethereum_key });
        } finally {
            // Releases the connection
            if (connection != null) {
                connection.release();
            }
        }
    }

    /**
     * Updates a user 
     */
    static async updateEntry(_, { username, ethereum_key }) {
        const connection: any = await mySQLWrapper.getConnectionFromPool();
        try {
            await this.update(connection, {
                id: ethereum_key,
                data: {
                    username
                }
            });

            return this.getByEthAddress(_, { ethereum_key });
        } finally {
            // Releases the connection
            if (connection != null) {
                connection.release();
            }
        }
    }
}
