export function getPort() {
    let port;
    if (process.env.NODE_ENV == 'production') {
        port = process.env.NFT_MARKET_IMAGE_API_SERVER_PORT_PROD;
    } else {
        port = process.env.NFT_MARKET_IMAGE_API_SERVER_PORT_DEV;
    }
    return port;
}
