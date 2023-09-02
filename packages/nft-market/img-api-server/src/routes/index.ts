import express from 'express';
import graphql from './graphql';
import image from './image';
import path from 'path';

export default class Routes {
    /**
     * Applies the routes to specific paths
     * @param {*} app - The instance of express which will be serving requests.
     */
    constructor(app) {
        if (app == null) {
            throw new Error("You must provide an instance of express");
        }

        if (process.env.NODE_ENV == 'development') {
            app.use(function(req, res, next) {
                res.header("Access-Control-Allow-Origin", "http://localhost:1337");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                next();
            });
        }

        app.use('/graphql-img', graphql);
        app.use('/image', image);

        app.use('/static', express.static(path.join(__dirname, '..', 'uploads')))
    }
}
