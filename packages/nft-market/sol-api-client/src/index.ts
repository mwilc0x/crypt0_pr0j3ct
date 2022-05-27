require('dotenv').config({ path: '../.env' });
import express, { json, urlencoded } from 'express';
import amqp from 'amqplib';
import { BrokerAsPromised } from 'rascal';
import Routes from './routes';
import { getPort } from './util';
import db from './models';
import config from './rascal-config.json';

class Server {
    app;
    rabbitMQConnection;
    rabbitMQChannel;

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
        try {
            config.vhosts.server1.connection.url = `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_DEFAULT_HOST}:${process.env.RABBITMQ_DEFAULT_PORT}`;
            const broker = await BrokerAsPromised.create(config);
            broker.on('error', console.error);
            console.log('Connected to RabbitMQ!', broker);
            return this;
        } catch (error) {
            console.log(error);
        }
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
        new Routes(this.app);
    }
}

function main() {
    const app = new Server();
    app.applyMiddleware();
    app.initRabbitMQ();
    app.run();
}

main();
