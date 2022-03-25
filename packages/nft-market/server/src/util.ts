import { promises as fs } from 'fs';
import { BigNumber, ethers } from 'ethers';

interface MintResponse {
    type: number,
    chainId: number,
    nonce: number,
    maxPriorityFeePerGas: BigNumber,
    maxFeePerGas: BigNumber,
    gasPrice: number,
    gasLimit: BigNumber,
    to: string,
    value: BigNumber,
    data: string,
    accessList: [],
    hash: string,
    v: number,
    r: string,
    s: string,
    from: string,
    confirmations: number,
    wait: Function
}

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

interface TokenProps {
    abi: string, 
    amount: number,
    contract: string,
    network: string,
    to: string
}
export const mintToken = async (props: TokenProps): Promise<MintResponse> => {
    try {
        const { network, contract, abi, amount, to } = props;
        const provider = getProviderForNetwork(network);
        const key: string = `0x${process.env.SIGNER_KEY}` || '';
        // https://stackoverflow.com/a/69157542
        const signer = new ethers.Wallet(
            key, 
            provider
        );
        const sendContract = new ethers.Contract(contract, abi, signer);
        const parsedAmount = ethers.utils.parseEther(amount.toString());
        let response = await sendContract?.mint(to, parsedAmount);
        return response;
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
