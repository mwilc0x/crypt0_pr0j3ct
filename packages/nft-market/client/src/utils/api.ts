import strings from './strings';
import { BigNumber, utils } from 'ethers';

export const getContractName = () => {
    return 'NFTMarket';
}

export const getWebServerUrl = () => {
    let apiUrl;

    if (process.env.NODE_ENV == 'development') {
        apiUrl = `http://localhost:${process.env.WEB_SERVER_PORT_DEV}`;
    } else {
        apiUrl = window.document.location.origin;
    }

    return apiUrl;
}


export const getApiUrl = () => {
    let apiUrl;

    if (process.env.NODE_ENV == 'development') {
        apiUrl = `http://localhost:${process.env.IMAGE_API_PORT_DEV}`;
    } else {
        apiUrl = window.document.location.origin;
    }

    return apiUrl;
}

export const mintToken = async (contract: string, to: string, amount: number) => {
    const apiUrl = `${getWebServerUrl()}${strings.mintEndpoint}`;
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

export const getContract = async (contractName: string): Promise<PartialContract> => {
    const chainId: string = getChainId();
    let resp: PartialContract = await fetch(`${getWebServerUrl()}/contract/${chainId}/${contractName}`).then((res: Response) => res.json());
    return resp;
}

export const getUsers = async (): Promise<User[]> => {
    let resp: User[] = await fetch(`${getWebServerUrl()}/users`).then((res: Response) => res.json());
    return resp;
}

const getChainId = () => {
    const chainId: string = process.env.APP_NETWORK_CHAIN_ID || '4'; // default rinkeby
    return chainId.toString();
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

export const formatListingsData = async (contract: any, listings: any): Promise<Listing[]> => {
    try {
        const items = await Promise.all<Listing[]>(listings.map(async (listing: any) => {
            const tokenId = BigNumber.from(listing[2]).toNumber();
            const tokenUri = await contract.tokenURI(tokenId).then((t: any) => t);
            return <Listing>{
                name: listing[0],
                description: listing[1],
                tokenId,
                tokenUri,
                seller: listing[3],
                owner: listing[4],
                price: utils.formatUnits(listing[5].toString(), 'ether'),
                forSale: listing[6]
            }
        }));
        return items;
    } catch (e) {
        console.error('Error formatting listing data', e);
        return Promise.resolve([]);
    }
}

export const shortenAddressString = (address: string) => {
    return address.substring(0, 6) + '...' + address.substring(address.length-4, address.length);
}