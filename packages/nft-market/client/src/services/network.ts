import { providers } from 'ethers';

export const checkNetwork = (): Promise<string> => {
    if (!window.ethereum) {
        return Promise.resolve('');
    }

    return new Promise((resolve) => {
        return window.ethereum.sendAsync({
            method: "net_version",
            params: [],
            jsonrpc: "2.0",
            id: '67'
        }, (error: any, response: any) => {
            if (error) {
                resolve('');
            }
            console.log('net_version', response);
            resolve(response.result);
        });
    });
}

export const checkIfWalletConnected = (): Promise<string[]> => {
    if (!window.ethereum) {
        return Promise.resolve([]);
    }

    return new Promise((resolve) => {
        return window.ethereum.sendAsync({
            method: "eth_accounts",
            params: [],
            jsonrpc: "2.0",
            id: new Date().getTime()
        }, (error: any, response: any) => {
            if (error) {
                resolve([]);
            }
            resolve(response.result);
        });
    });
}

const getChainId = () => {
    const chainId: string = process.env.APP_NETWORK_CHAIN_ID || '';
    return chainId;
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
        '31337': 'Localhost',
        '42161': 'Arbitrum One',
        '43114': 'Avalanche'
    };
    return chainIds[id] || '';
}

export async function getNetworkErrorStatus() {
    const appNetworkChainId = process.env.APP_NETWORK_CHAIN_ID || '';
    await window.ethereum.enable()
    const provider = new providers.Web3Provider(window.ethereum);
    const network = await provider.getNetwork();

    let networks = {
        appNetwork: getNetworkForChainId(appNetworkChainId),
        userNetwork: getNetworkForChainId(network.chainId.toString())
    };

    if (network.chainId.toString() !== appNetworkChainId) {
        return {
            error: true,
            ...networks
        };
    }

    return {
        error: false,
        ...networks
    };
}
