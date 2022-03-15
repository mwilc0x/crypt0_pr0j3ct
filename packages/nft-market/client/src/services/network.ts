import { providers } from 'ethers';

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
