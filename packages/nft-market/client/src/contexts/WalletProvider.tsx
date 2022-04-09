import React from 'react';
import { Contract, providers, utils } from 'ethers';
import { formatListingsData, getContract, getContractName } from '../utils/api';
import { checkIfWalletConnected } from '../services/network';
import { saveImageForURL } from '../services/api';

// use for ethereum global w/ TypeScript
declare global {
    interface Window { ethereum: any; }
}

export const WalletContext = React.createContext<any>({});
type Props = { children: React.ReactNode };
const WalletProvider = (props: Props) => {
    const [addresses, setAddresses] = React.useState<String[]>([]);
    const [nftListings, setNftListings] = React.useState<Listing[]>([]);
    const [myNftListings, setMyNftListings] = React.useState<Listing[]>([]);
    const [itemCreatedListener, setItemCreatedListener] = React.useState(false);

    React.useEffect(() => {
        const setup = async () => {
            const results = await checkIfWalletConnected();
            setAddresses(results);

            window.ethereum.on('accountsChanged', (updatedAddresses: string[]) => {
                let currentAddress = addresses[0] || '';
                let updatedAddress = updatedAddresses[0] || '';
                currentAddress = currentAddress.toLowerCase();
                updatedAddress = updatedAddress.toLowerCase();

                if (updatedAddress && (currentAddress !== updatedAddress)) {
                    getNftListings();
                    getMyNftListings();
                }

                setAddresses(updatedAddresses);
            });
        }

        setup();
    }, []);

    const connectWallet = async () => {
        window.ethereum.request({
            method: "wallet_requestPermissions",
            params: [{
                eth_accounts: {}
            }]
        })
        .then(() => {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then((addresses: String[]) => {
                    console.log('Wallet Connected', addresses);
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
        })
        .catch((error: any) => {
            console.log(error);
        });
    }

    const disconnectWallet = async () => {
        setAddresses([]);
    }

    const createNFT = async (
        name: string,
        description: string,
        file: FileUpload,
        price: number
    ) => {
        try {
            const result = await saveImageForURL({ name, description, file, price });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    const sellNFT = async (
        tokenId: number,
        price: number
    ) => {
        const { abi, address } = await getContract(getContractName());
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

    const cancelSale = async (
        tokenId: number
    ) => {
        const { abi, address } = await getContract(getContractName());
        await window.ethereum.enable()
        const provider = new providers.Web3Provider(window.ethereum)
        const contract = new Contract(
            address,
            abi,
            provider.getSigner()
        );
        contract.cancelMarketSale(
            tokenId,
            { gasLimit: 1000000 }
        );
    }

    const getNftListings = async () => {
        const { abi, address } = await getContract(getContractName());
        await window.ethereum.enable();
        const provider = new providers.Web3Provider(window.ethereum);
        console.log('getting contract!', address, abi);
        const contract = new Contract(
            address,
            abi,
            provider.getSigner()
        );
        try {
            const listings = await contract.fetchMarketItems();
            const formattedListings = await formatListingsData(contract, listings);
            setNftListings(formattedListings);
        } catch (e) {
            console.log('fetch nft listings error', e);
        }
    }

    const getMyNftListings = async () => {
        const { abi, address } = await getContract(getContractName());
        await window.ethereum.enable();
        const provider = new providers.Web3Provider(window.ethereum)
        const contract = new Contract(
            address,
            abi,
            provider.getSigner()
        );
        const listings = await contract.fetchMyNFTs();
        const formattedListings = await formatListingsData(contract, listings);
        setMyNftListings(formattedListings);
    }

    const contextValue = React.useMemo(() => ({
        addresses,
        nftListings,
        myNftListings,
        connectWallet,
        disconnectWallet,
        createNFT,
        sellNFT,
        cancelSale,
        getNftListings,
        getMyNftListings
    }), [addresses, nftListings, myNftListings])

    return (
        <WalletContext.Provider value={contextValue}>
            {props.children}
        </WalletContext.Provider>
    );
}

export default WalletProvider;
