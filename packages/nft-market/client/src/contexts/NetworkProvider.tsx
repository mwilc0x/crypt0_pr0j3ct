import React from 'react';
import { providers } from 'ethers';
import { checkNetwork } from '../services/network';
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

    function checkForNetworkError(chainId: string) {
        if (chainId === '') {
            setNetworkError({ error: true });
            return;
        }

        const chain = Number(chainId).toString(10);
        if (chain !== appNetworkChainId) {
            setNetworkError({ error: true });
        } else {
            setNetworkError({ error: false });
        }

        setUserNetwork({
            chainId: chain,
            name: getNetworkForChainId(chain)
        });
    }

    const networkChangeListener = () => {
        window.ethereum.on('chainChanged', (chainId: string) => {
            checkForNetworkError(chainId);
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
        const setup = async () => {
            const network = await checkNetwork();
            checkForNetworkError(network);
            networkChangeListener();

            setUserNetwork({
                chainId: network,
                name: getNetworkForChainId(network)
            });

            const appChainId = Number(process.env.APP_NETWORK_CHAIN_ID).toString();

            setAppNetwork({
                chainId: appChainId,
                name: getNetworkForChainId(appChainId)
            });
        }
        setup();
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
