import React from 'react';
import {
    Routes,
    Route
} from 'react-router-dom';
import Home from '../pages/Home';
import Mint from '../pages/Mint';
import Create from '../pages/UploadNFT';
import Market from '../pages/Listings';
import MyNFTs from '../pages/MyNFTs';
import Settings from '../pages/Settings';
import RequireAuth from './RequireAuth';
import NotFound from '../pages/NotFound';

const RoutingContainer: React.FC = () => {
    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/mint" element={<Mint />} />
            <Route path="/create" element={<Create />} />
            <Route path="/market" element={<Market />} />
            <Route path="/my-nfts" element={<MyNFTs />} />
            <Route path="/settings" element={<Settings />} />
        </Routes>
    );
}

export default RoutingContainer;
