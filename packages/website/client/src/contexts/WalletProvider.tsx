import React from 'react';

// use for ethereum global w/ TypeScript
declare global {
    interface Window { ethereum: any; }
}

export const WalletContext = React.createContext<any>({});
type Props = { children: React.ReactNode };
const WalletProvider = (props: Props) => {
    const [addresses, setAddresses] = React.useState<String[]>();

    window.ethereum.on('accountsChanged', (addresses: String[]) => {
        // Handle the new accounts, or lack thereof.
        // "accounts" will always be an array, but it can be empty.
        setAddresses(addresses);
    });

    window.ethereum.on('chainChanged', (chainId: String) => {
        console.log(`Chain changed: ${chainId}`);
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

    const contextValue = React.useMemo(() => ({
        addresses,
        connectWallet,
    }), [addresses, connectWallet])

    return (
        <WalletContext.Provider value={contextValue}>
            {props.children}
        </WalletContext.Provider>
    );
}

export default WalletProvider;