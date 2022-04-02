require('dotenv').config({ path: '../../../.env' });
import express from 'express';
import router from './routes';
import { connectDb } from './db';

async function main() {
    const app = express();
    app.use(router);
    await connectDb();
    
    let port;
    if (process.env.NODE_ENV == 'production') {
        port = process.env.NFT_MARKET_API_SERVER_PORT_PROD;
    } else {
        port = process.env.NFT_MARKET_API_SERVER_PORT_DEV;
    }
    
    app.listen(port, () => console.log(`Server listening on port: ${port}`));
}

main();
