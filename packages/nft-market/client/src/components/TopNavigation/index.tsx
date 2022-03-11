import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../LogoutButton';
import ToggleSwitch from '../ToggleSwitch';
import WalletButton from '../WalletButton';
import { UserContext, WalletContext } from '../../contexts';
import './style.scss';

const TopNavigation: React.FC = () => {
    const { logout } = React.useContext(UserContext);
    const { connectWallet } = React.useContext(WalletContext);
    const handleLogout = () => {
        logout();
    }
    const handleConnectWallet = () => {
        connectWallet();
    };

    return (
        <div className="navigation">
            <h3>NFT Market</h3>
            <div className="links">
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/chat">Chat</Link>
                </nav>
                <ToggleSwitch />
                <LogoutButton handleClickFromParent={handleLogout} />
                <WalletButton handleClickFromParent={handleConnectWallet} text="Wallet" />
            </div>
        </div>
    );
}

export default TopNavigation;
