import React from 'react';
import { providers } from 'ethers';
import { getNetworkForChainId } from '../utils/api';

type Network = {
    name: string;
    chainId: string;
};
type NetworkError = {
    error: boolean;
}
export const NetworkContext = React.createContext<any>({});
type Props = { children: React.ReactNode };
const NetworkProvider = (props: Props) => {
    const appNetworkChainId = process.env.APP_NETWORK_CHAIN_ID || '';
    const [appNetwork, setAppNetwork] = React.useState<Network>({ name: '', chainId: '' });
    const [userNetwork, setUserNetwork] = React.useState<Network>({ name: '', chainId: '' });
    const [networkError, setNetworkError] = React.useState<NetworkError>({ error: false });

    const networkChangeListener = () => {
        window.ethereum.on('chainChanged', (chainId: String) => {
            const chain = Number(chainId).toString(10);
            console.log(`User changed eth network: ${chain} : ${getNetworkForChainId(chain)}`);

            if (chain !== appNetworkChainId) {
                setNetworkError({ error: true });
            } else {
                setNetworkError({ error: false });
            }
        });
    }

    const getUserNetwork = async () => {
        try {
            await window.ethereum.enable()
            const provider = new providers.Web3Provider(window.ethereum);
            const network = await provider.getNetwork();
            setUserNetwork({
                name: getNetworkForChainId(network.chainId.toString()),
                chainId: network.chainId.toString()
            });

            if (network.chainId.toString() !== appNetworkChainId) {
                setNetworkError({ error: true });
            } else {
                setNetworkError({ error: false });
            }
        } catch (e) {
            setUserNetwork({ name: '', chainId: '' });
            setNetworkError({ error: true });
            console.error(`Error retrieving the user's eth network.`, e);
        }
    }

    // initial lookup
    React.useEffect(() => {
        networkChangeListener();
        getUserNetwork();
        setAppNetwork({
            name: getNetworkForChainId(appNetworkChainId),
            chainId: appNetworkChainId
        });
    }, []);

    const contextValue = React.useMemo(() => ({
        appNetwork,
        userNetwork,
        networkError,
        getUserNetwork
    }), [appNetwork, userNetwork, networkError])

    return (
        <NetworkContext.Provider value={contextValue}>
            {props.children}
        </NetworkContext.Provider>
    );
}

export default NetworkProvider;
