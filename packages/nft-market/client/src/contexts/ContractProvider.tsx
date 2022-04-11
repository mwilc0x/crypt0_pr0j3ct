import React from 'react';
import { getContract } from '../utils/api';

// use for ethereum global w/ TypeScript
declare global {
    interface Window { ethereum: any; }
}

export const ContractContext = React.createContext<any>({});
type Props = { children: React.ReactNode };
const ContractProvider = (props: Props) => {
    const [transaction, setTransaction] = React.useState<Object>({});

    const clearTransaction = () => {
        setTransaction({});
    }

    const contextValue = React.useMemo(() => ({
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
