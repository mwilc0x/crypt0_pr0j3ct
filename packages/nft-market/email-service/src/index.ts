require('dotenv').config({ path: '../.env' });
import express, { json, urlencoded } from 'express';
import { BrokerAsPromised } from 'rascal';
import Routes from './routes';
import { getPort } from './util';
import config from './rascal-config.json';

class Server {
    app;
    rabbitMQConnection;
    rabbitMQChannel;

    constructor() {
        this.app = express();
    }

    run() {
        const port = getPort();
        this.app.listen(port, () => console.log(`Email Service listening on port: ${port}`));
    }

    initRabbitMQ = async () => {
        try {
            config.vhosts.server1.connection.url = `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_DEFAULT_HOST}:${process.env.RABBITMQ_DEFAULT_PORT}`;
            
            setTimeout(async () => {
                const broker = await BrokerAsPromised.create(config);
                broker.on('error', console.error);
                console.log('Connected to RabbitMQ from Email Service!', broker);

                const subscription = await broker.subscribe('email_subscription');

                subscription.on('message', async (message, content, ackOrNack) => {
                    try {
                        console.log('Heard message', message, content, ackOrNack);
                    } catch (err) {
                        console.log('Error hearing message', err, message, content, ackOrNack);
                    }
                })
                .on('error', (err, message, ackOrNack) => {
                    console.log('Error hearing message', err, message, ackOrNack);
                })
                .on('invalid_content', (err, message, ackOrNack) => {
                    console.log('Invalid content hearing message', err, message, ackOrNack);
                });
            }, 120000);
        } catch (error) {
            console.log('Email Service error connecting to RabbitMQ', error);
        }
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
