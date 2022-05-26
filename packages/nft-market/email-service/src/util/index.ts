export function getPort() {
    let port;
    if (process.env.NODE_ENV == 'production') {
        port = process.env.EMAIL_SERVICE_PORT_PROD;
    } else {
        port = process.env.EMAIL_SERVICE_PORT_DEV;
    }
    return port;
}

export function isProduction() {
    return process.env.NODE_ENV == 'production';
}
