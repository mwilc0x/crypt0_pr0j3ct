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
        '43114': 'Avalanche'
    };
    return chainIds[id] || '';
}
