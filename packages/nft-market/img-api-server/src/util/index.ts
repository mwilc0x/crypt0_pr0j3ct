import crypto from 'crypto';

export function getPort() {
    let port;
    if (process.env.NODE_ENV == 'production') {
        port = process.env.IMAGE_API_SERVER_PORT_PROD;
    } else {
        port = process.env.IMAGE_API_SERVER_PORT_DEV;
    }
    return port;
}

export function hashImage(image: string) {
    const hash = crypto.createHash('sha256').update(image).digest('base64');
    return hash;
}

export function isProduction() {
    return process.env.NODE_ENV == 'production';
}

export const sqlConstants = {
    ASC: "asc",
    DESC: "desc"
}