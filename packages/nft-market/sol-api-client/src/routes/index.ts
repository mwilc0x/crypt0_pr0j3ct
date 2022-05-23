import dashboard from './dashboard';
import user from './user';
import auth from './auth';

export default class Routes {
    /**
     * Applies the routes to specific paths
     * @param {*} app - The instance of express which will be serving requests.
     */
    constructor(app) {
        if (app == null) {
            throw new Error('You must provide an instance of express');
        }

        app.use(function(req, res, next) {
            if (process.env.NODE_ENV == 'development') {
                res.header('Access-Control-Allow-Origin', 'http://localhost:1337');
            }
            res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
            next();
        });

        app.use('/subsea', dashboard);
        app.use('/deepwater', user);
        app.use('/deepwater', auth);
    }
}
