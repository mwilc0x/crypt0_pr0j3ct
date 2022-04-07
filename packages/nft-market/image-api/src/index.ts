require('dotenv').config({ path: '../../../.env' });
import express from 'express';
import Routes from './routes';
import { getPort } from './util';

class Server {
    app;
    constructor() {
        this.app = express();
    }

    run() {
        const port = getPort();
        this.app.listen(port, () => console.log(`API server listening on port: ${port}`));
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
