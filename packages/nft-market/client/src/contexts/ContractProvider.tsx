import React from 'react';
import { getContract, mintToken } from '../utils/api';

// use for ethereum global w/ TypeScript
declare global {
    interface Window { ethereum: any; }
}

export const ContractContext = React.createContext<any>({});
type Props = { children: React.ReactNode };
const ContractProvider = (props: Props) => {
    const [transaction, setTransaction] = React.useState<Object>({});

    const mint = async (contractName: string, toAddress: string, amount: number) => {
        const { address } = await getContract(contractName);
        const response = await mintToken(address, toAddress, amount);
        setTransaction(response);
    }

    const clearTransaction = () => {
        setTransaction({});
    }

    const contextValue = React.useMemo(() => ({
        mint,
        transaction,
        clearTransaction
    }), [transaction]);

    return (
        <ContractContext.Provider value={contextValue}>
            {props.children}
        </ContractContext.Provider>
    );
}

export default ContractProvider;
