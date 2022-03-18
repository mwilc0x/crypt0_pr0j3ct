import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoutButton from '../LogoutButton';
import ToggleSwitch from '../ToggleSwitch';
import WalletButton from '../WalletButton';
import { UserContext, WalletContext } from '../../contexts';
import './style.scss';

const TopNavigation: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = React.useContext(UserContext);
    const { connectWallet } = React.useContext(WalletContext);
    const handleLogout = () => {
        logout();
    }
    const handleConnectWallet = () => {
        connectWallet();
    };
    const goHome = () => navigate('/');

    return (
        <div className="navigation">
            <h3 onClick={goHome}>Foamies</h3>
            <div className="links">
                <nav>
                    <Link to="/create">Create</Link>
                    <Link to="/market">Market</Link>
                </nav>
                <ToggleSwitch />
                <LogoutButton handleClickFromParent={handleLogout} />
                <WalletButton handleClickFromParent={handleConnectWallet} text="Wallet" />
            </div>
        </div>
    );
}

export default TopNavigation;
