import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import TopNavigation from './components/TopNavigation';
import Footer from './components/Footer';
import Routes from './routes';
import {
    WalletProvider,
    ThemeProvider,
    NetworkProvider,
} from './contexts';
import { Provider as GraphQLProvider } from 'urql';
import graphqlClient from './utils/graphqlClient';
import './styles/themes.scss';
import './styles/styles.scss';

export default () => {
    return (
        <GraphQLProvider value={graphqlClient}>
            <NetworkProvider>
                <WalletProvider>
                    <ThemeProvider>
                        <BrowserRouter>
                            <TopNavigation />
                            <Routes />
                            <Footer />
                        </BrowserRouter>
                    </ThemeProvider>
                </WalletProvider>
            </NetworkProvider>
        </GraphQLProvider>
    );
}

