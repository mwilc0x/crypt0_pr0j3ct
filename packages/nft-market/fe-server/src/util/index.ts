import { promises as fs } from 'fs';
import { ethers } from 'ethers';

interface ContractJSON {
    [key: string]: {
        [key: string]: { contracts: {
            [key: string]: { address: string, abi: Object }
        }}
    }
}

export const readContracts = async (): Promise<ContractJSON> => {
    try {
        const data = await fs.readFile('./src/generated/hardhat_contracts.json');
        return JSON.parse(data.toString());
    } catch (error) {
        let message = 'failed to read contract data';
        if (error instanceof Error) message = error.message
        throw new Error(message);
    }
}

export const getProviderForNetwork = (network: string): ethers.providers.InfuraProvider => {
    try {
        const networkKey = `${network}_infura_key`.toUpperCase();
        const apiKey = process.env[networkKey];
        const provider = new ethers.providers.InfuraProvider(network, apiKey);
        return provider;
    } catch (error) {
        let message = 'provider failed to init';
        if (error instanceof Error) message = error.message
        throw new Error(message);
    }
}

export const getNetworkForChainId = (id: string): string => {
    const chainIds: { [key: string]: string; } = {
        '1': 'Mainnet',
        '3': 'Ropsten',
        '4': 'Rinkeby',
        '5': 'Goerli',
        '10': 'Optimism',
        '42': 'Kovan',
        '56': 'BSC',
        '137': 'Polygon',
        '250': 'Fantom Opera',
        '31337': 'Localhost',
        '42161': 'Arbitrum One',
        '43114': 'Avalanche',
        '11155111': 'Sepolia'
    };
    return chainIds[id] || '';
}

export function getPort() {
    let port;
    if (process.env.NODE_ENV == 'production') {
        port = process.env.FE_API_SERVER_PORT_PROD;
    } else {
        port = process.env.FE_API_SERVER_PORT_DEV;
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

export const API_DELAY = 2000;
// How long the server waits for data before giving up.
export const ABORT_DELAY = 10000;
// How long serving the JS bundles is delayed.
export const JS_BUNDLE_DELAY = 4000;