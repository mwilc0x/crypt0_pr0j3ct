require('dotenv').config({ path: '../.env' });
import express from 'express';
import mongoose from 'mongoose';
import Routes from './routes';
import { getPort } from './util';

class Server {
    app;
    constructor() {
        this.app = express();
    }

    run() {
        const port = getPort();
        this.app.listen(port, () => console.log(`Image API server listening on port: ${port}`));
    }

    applyMiddleware() {
        new Routes(this.app);
    }
}

function main() {
    const app = new Server();
    app.applyMiddleware();
    app.run();
}

main();
