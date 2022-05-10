export function getPort() {
    let port;
    if (process.env.NODE_ENV == 'production') {
        port = process.env.SOLANA_API_SERVER_PORT_PROD;
    } else {
        port = process.env.SOLANA_API_SERVER_PORT_DEV;
    }
    return port;
}

export function isProduction() {
    return process.env.NODE_ENV == 'production';
}

export const sqlConstants = {
    ASC: "asc",
    DESC: "desc"
}
