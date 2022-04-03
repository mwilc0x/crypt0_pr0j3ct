import graphql from './graphql';
import contract from './contract';

export default class Routes {
    /**
     * Applies the routes to specific paths
     * @param {*} app - The instance of express which will be serving requests.
     */
    constructor(app) {
        if (app == null) {
            throw new Error("You must provide an instance of express");
        }
        app.use('/graphql', graphql);
        app.use('/contract', contract);
    }
}
