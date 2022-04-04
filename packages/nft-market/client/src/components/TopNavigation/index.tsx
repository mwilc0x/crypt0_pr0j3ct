import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoutButton from '../LogoutButton';
import ToggleSwitch from '../ToggleSwitch';
import WalletButton from '../WalletButton';
import { UserContext, WalletContext } from '../../contexts';
import './style.scss';

type UserDrawerProps = {
    toggleUserDrawer: Function
};
const UserDrawer = (props: UserDrawerProps) => {
    const { disconnectWallet } = React.useContext(WalletContext);
    const navigate = useNavigate();
    type Link = {
        name: string;
        route: string;
        action?: Function | undefined
    }
    const links = [
        { name: 'Profile',      route: '/profile', icon: '' },
        { name: 'Favorites',    route: '/favorites', icon: '' },
        { name: 'Watchlist',    route: '/watchlist', icon: '' },
        { name: 'Settings',     route: '/settings', icon: '' },
        { name: 'My NFTs',      route: '/my-nfts', icon: '' },
        { name: 'Logout',       route: '/', action: () => { disconnectWallet(); }, icon: '' }
    ];

    const handleLinkClick = (link: Link) => {
        return () => {
            if (link.action) {
                link.action();
            } else {
                navigate(link.route);
            }
            props.toggleUserDrawer();
        }
    }

    return (
        <div className="user-drawer">
            <ul>
                { links.map((link, i) => (
                    <li key={i} onClick={handleLinkClick(link)}>{link.name}</li>
                ))}
            </ul>
        </div>
    );
}


const TopNavigation: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = React.useContext(UserContext);
    const { connectWallet } = React.useContext(WalletContext);
    const [ showUserDrawer, toggleUserDrawer ] = React.useState(false);

    const handleLogout = () => {
        logout();
    }
    const handleConnectWallet = () => {
        connectWallet();
    };
    const goHome = () => navigate('/');
    const handleAddressClick = () => {
        toggleUserDrawer(!showUserDrawer);
    }

    return (
        <div className="navigation">
            <h2 onClick={goHome}>Foamies</h2>
            <div className="links">
                <nav>
                    <Link to="/create">Create</Link>
                    <Link to="/market">Market</Link>
                </nav>
                <ToggleSwitch />
                <LogoutButton handleClickFromParent={handleLogout} />
                <WalletButton
                    handleAddressClick={handleAddressClick}
                    handleConnectWalletClick={handleConnectWallet} text="Connect"
                />
            </div>

            { showUserDrawer && <UserDrawer toggleUserDrawer={toggleUserDrawer} />}
        </div>
    );
}

export default TopNavigation;
