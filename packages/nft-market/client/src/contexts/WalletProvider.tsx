import React from 'react';
import { Contract, providers, utils } from 'ethers';
import { formatListingsData, getContract, Listing } from '../utils/api';

// use for ethereum global w/ TypeScript
declare global {
    interface Window { ethereum: any; }
}

const contractName = 'NFTMarket';

export const WalletContext = React.createContext<any>({});
type Props = { children: React.ReactNode };
const WalletProvider = (props: Props) => {
    const [addresses, setAddresses] = React.useState<String[]>([]);
    const [nftListings, setNftListings] = React.useState<Listing[]>([]);

    window.ethereum.on('accountsChanged', (addresses: String[]) => {
        // Handle the new accounts, or lack thereof.
        // "accounts" will always be an array, but it can be empty.
        setAddresses(addresses);
    });

    const connectWallet = async () => {
        window.ethereum
            .request({ method: 'eth_requestAccounts' })
            .then((addresses: String[]) => {
                setAddresses(addresses);
            })
            .catch((error: any) => {
                if (error.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    console.log('Please connect to MetaMask.');
                } else {
                    console.error(error);
                }
            });
    }

    const createNFT = async (
        name: string,
        description: string,
        tokenURI: string,
        price: number
    ) => {
        const { abi, address } = getContract(contractName);
        await window.ethereum.enable()
        const provider = new providers.Web3Provider(window.ethereum)
        const contract = new Contract(
            address,
            abi,
            provider.getSigner()
        );
        contract.createToken(
            name,
            description,
            tokenURI, 
            utils.parseUnits(price.toString(), 'ether'),
            { gasLimit: 1000000, value: utils.parseEther('0.025') }
        );
    }

    const sellNFT = async (
        tokenId: number,
        price: number
    ) => {
        const { abi, address } = getContract(contractName);
        await window.ethereum.enable()
        const provider = new providers.Web3Provider(window.ethereum)
        const contract = new Contract(
            address,
            abi,
            provider.getSigner()
        );
        contract.createMarketSale(
            tokenId,
            { gasLimit: 1000000, value: utils.parseUnits(price.toString(), 'ether') }
        );
    }

    const getNftListings = async () => {
        const { abi, address } = getContract(contractName);
        await window.ethereum.enable();
        const provider = new providers.Web3Provider(window.ethereum)
        const contract = new Contract(
            address,
            abi,
            provider.getSigner()
        );
        const listings = await contract.fetchMarketItems();
        const formattedListings = await formatListingsData(contract, listings);
        setNftListings(formattedListings);
    }

    const contextValue = React.useMemo(() => ({
        addresses,
        nftListings,
        connectWallet,
        createNFT,
        sellNFT,
        getNftListings
    }), [addresses, nftListings])

    return (
        <WalletContext.Provider value={contextValue}>
            {props.children}
        </WalletContext.Provider>
    );
}

export default WalletProvider;
