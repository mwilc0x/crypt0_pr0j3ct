import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import TopNavigation from './components/TopNavigation';
import Footer from './components/Footer';
import Routes from './routes';
import {
    UserProvider, 
    WalletProvider,
    ContractProvider,
    ThemeProvider,
    WebSocketProvider,
    NetworkProvider
} from './contexts';
import './styles/themes.scss';
import './styles/styles.scss';

const App: React.FC = () => {
    return (
        <UserProvider>
            <NetworkProvider>
                <WalletProvider>
                    <ContractProvider>
                        <ThemeProvider>
                            <WebSocketProvider>
                                <BrowserRouter>
                                    <TopNavigation />
                                    <Routes />
                                    <Footer />
                                </BrowserRouter>
                            </WebSocketProvider>
                        </ThemeProvider>
                    </ContractProvider>
                </WalletProvider>
            </NetworkProvider>
        </UserProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));