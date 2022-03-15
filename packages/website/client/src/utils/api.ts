import contractJson from '../generated/hardhat_contracts.json';
import strings from './strings';

interface ContractJSON {
    [key: string]: {
        [key: string]: { contracts: {
            [key: string]: { address: string, abi: Object }
        }}
    }
}

const getApiUrl = () => {
    let apiUrl;

    if (process.env.NODE_ENV == 'development') {
        apiUrl = `http://localhost:${process.env.CRYPTO_API_SERVER_PORT_DEV}`;
    } else if (process.env.NODE_ENV == 'production') {
        apiUrl = '';
    } else {
        apiUrl = '';
    }

    return apiUrl;
}

export const mintToken = async (contract: string, to: string, amount: number) => {
    const apiUrl = `${getApiUrl()}${strings.mintEndpoint}`;
    const chainId: string = getChainId();

    try {
        const request = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount, chainId, contract, to })
        })
        const response = await request.json().then(data => data);
        return response;
    } catch (error) {
        let message = strings.mintError;
        if (error instanceof Error) message = error.message
        throw new Error(message);
    }
}

export const getContract = (contractName: string) => {
    const chainId: string = getChainId();
    const contract = (contractJson as ContractJSON)[chainId].rinkeby.contracts[contractName];
    return contract;
}

const getChainId = () => {
    const chainId: string = process.env.APP_NETWORK_CHAIN_ID || '4'; // default rinkeby
    return chainId;
}
