import { DAO, mySQLWrapper } from '../../lib';
import { hashImage } from '../../util';

export default class Image extends DAO {

    /**
     * Overrides TABLE_NAME with this class' backing table at MySQL
     */
    static get TABLE_NAME() {
        return 'images';
    }

    /**
     * Returns a image by its ID
     */
    static async getByID(_, { id }) {
        return await this.find(id);
    }

    /**
     * Returns a list of images matching the passed fields
     * @param {*} fields - Fields to be matched
     */
    static async findMatching(_, fields) {
        // Returns early with all images if no criteria was passed
        if (Object.keys(fields).length === 0) {
            return this.findAll();
        }
        
        // Find matching images
        return this.findByFields({
            fields
        });
    }

    /**
     * Creates a new image
     */
    static async createEntry(_, { file, name }) {
        const connection: any = await mySQLWrapper.getConnectionFromPool();
        try {
            const id = hashImage(file);
            let _result: any = await this.insert(connection, {
                data: {
                    id,
                    file,
                    name
                }
            });

            return this.getByID(_, { id: _result.insertId });
        } finally {
            // Releases the connection
            if (connection != null) {
                connection.release();
            }
        }
    }
}
