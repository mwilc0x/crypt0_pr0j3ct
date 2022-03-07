import React from 'react';
import { ContractContext, WalletContext } from '../../contexts';
import strings from '../../utils/strings';
import './style.scss';

const Mint: React.FC = () => {
    const [amount, setAmount] = React.useState(0);
    const { clearTransaction, mint, transaction } = React.useContext(ContractContext);
    const { addresses } = React.useContext(WalletContext);
    const contractName = 'WOOL';

    // cleanup on unmount
    React.useEffect(() => {
        return () => {
            clearTransaction();
        }
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const num = parseInt(event.target.value) || 0;
        setAmount(num);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { tokenMin, tokenMax } = strings;
        const min = 0;
        const max = 1000;
        
        if (amount < min || amount == min) {
            console.log(tokenMin(min));
            return;
        }

        if (amount > max) {
            console.log(tokenMax(1000));
            return;
        }

        handleMint(amount);
        setAmount(min);
    }

    const handleMint = async (amount: number) => {
        if (addresses == undefined || addresses.length == 0) {
            console.log(strings.noWalletConnected);
            return;
        }
        mint(contractName, addresses[0], amount);
    }

    const { hash } = transaction;
    
    return (
        <div className="page">
            <div>
                <form onSubmit={handleSubmit} className="mint-form">
                    <p>How many {contractName} tokens?</p>
                    <div className="mint-form-inputs">
                        <input type="text" pattern="[0-9]*" onChange={handleChange} value={amount} />
                        <button type="submit">mint!</button>
                    </div>
                    { /* TODO: create a function to do the lookup of network specific etherscan address */ }
                    { hash && <p className="tx"><a href={`https://rinkeby.etherscan.io/tx/${hash}`} target = "_blank" rel = "noopener noreferrer">view your transaction</a></p>}
                </form>
            </div>            
        </div>
    );
}

export default Mint;
