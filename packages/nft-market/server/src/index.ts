require('dotenv').config({ path: '../../../.env' });
import express from 'express';
import Routes from './routes';
import { getPort } from './util';

class Server {
    app;
    constructor() {
        return (async (): Promise<Server> => {
            this.app = express();

            return this;
        })() as unknown as Server;
    }

    run() {
        const port = getPort();
        this.app.listen(port, () => console.log(`Server listening on port: ${port}`));
    }

    applyMiddleware() {
        new Routes(this.app);
    }
}

async function main() {
    const app = await new Server();
    app.applyMiddleware();
    app.run();
}

main();
