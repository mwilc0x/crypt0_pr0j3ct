require('dotenv').config({ path: '../../../.env' });
import express from 'express';
import router from './routes';

const app = express();
app.use(router);

let port;
if (process.env.NODE_ENV == 'production') {
    port = process.env.CRYPTO_API_SERVER_PORT_PROD;
} else if (process.env.NODE_ENV == 'development') {
    port = process.env.CRYPTO_API_SERVER_PORT_DEV;
} else {
    port = 4200;
}

app.listen(port, () => console.log(`Server listening on port: ${port}`));
