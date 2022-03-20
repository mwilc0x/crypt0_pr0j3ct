import React from 'react';
import { WalletContext } from '../../contexts';
import { shortenAddressString } from '../../utils/api';
import './style.scss';

type Props = {
    handleConnectWalletClick?: () => void,
    handleAddressClick?: () => void,
    text: String
};

const WalletButton = (props: Props) => {
    const { addresses = [] } = React.useContext(WalletContext);
    const {
        handleConnectWalletClick,
        handleAddressClick
    } = props;
    return (
        <>
            {
                addresses.length == 0 
                    ? <button className="wallet-button" onClick={handleConnectWalletClick}>{props.text}</button> 
                    : <button className="address-button" onClick={handleAddressClick}>{shortenAddressString(addresses[0])}</button>
            }
        </>
    );
}

export default WalletButton;
