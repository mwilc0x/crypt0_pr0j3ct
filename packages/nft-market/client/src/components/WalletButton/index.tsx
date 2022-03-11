import React from 'react';
import { WalletContext } from '../../contexts';
import './style.scss';

type Props = {
    handleClickFromParent?: () => void,
    text: String
};
const WalletButton = (props: Props) => {
    const { addresses = [] } = React.useContext(WalletContext);
    return (<>{addresses.length == 0 ? <button className="wallet-button" onClick={props.handleClickFromParent}>{props.text}</button> : null }</>);
}

export default WalletButton;
