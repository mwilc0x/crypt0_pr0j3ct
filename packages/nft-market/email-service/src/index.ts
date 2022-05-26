require('dotenv').config({ path: '../.env' });
import express, { json, urlencoded } from 'express';
import Routes from './routes';
import { getPort } from './util';

class Server {
    app;
    constructor() {
        this.app = express();
    }

    run() {
        const port = getPort();
        this.app.listen(port, () => console.log(`Email Service listening on port: ${port}`));
    }

    applyMiddleware() {
        this.app.use(json());
        this.app.use(urlencoded({ extended: true }));
        new Routes(this.app);
    }
}

function main() {
    const app = new Server();
    app.applyMiddleware();
    app.run();
}

main();
