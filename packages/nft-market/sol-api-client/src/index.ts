require('dotenv').config({ path: '../.env' });
import express, { json, urlencoded } from 'express';
import { BrokerAsPromised } from 'rascal';
import Routes from './routes';
import { getPort } from './util';
import db from './models';
import config from './rascal-config.json';

class Server {
    app;
    broker;

    constructor() {
        this.app = express();
    }

    run() {
        // db.sequelize.sync();
        // force: true will drop the table if it already exists
        db.sequelize.sync({ force: true }).then(() => {
            console.log('Drop and Resync Database with { force: true }');
            this.initRoles();
        });
        const port = getPort();
        this.app.listen(port, () => console.log(`Solana API Client listening on port: ${port}`));
    }

    initRabbitMQ = async () => {
        return new Promise((resolve) => {
            try {
                config.vhosts.server1.connection.url = `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_DEFAULT_HOST}:${process.env.RABBITMQ_DEFAULT_PORT}`;
                
                // TODO: may be a better way to do this
                setTimeout(async () => {
                    this.broker = await BrokerAsPromised.create(config);
                    this.broker.on('error', console.error);
                    console.log('Solana API Client connected to RabbitMQ!', this.broker);
                    resolve(true);
                }, 120000);
            } catch (error) {
                console.log('Solana API Client error connecting to RabbitMQ', error);
                resolve(false);
            }
        });
    }

    initRoles() {
        const Role = db.role;

        Role.create({
            id: 1,
            name: 'user'
        });
         
        Role.create({
            id: 2,
            name: 'moderator'
        });
         
        Role.create({
            id: 3,
            name: 'admin'
        });
    }

    applyMiddleware() {
        this.app.use(json());
        this.app.use(urlencoded({ extended: true }));
        new Routes(this.app, this.broker);
    }
}

async function main() {
    const app = new Server();
    await app.initRabbitMQ();
    app.applyMiddleware();
    app.run();
}

main();
