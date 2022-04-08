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
    NetworkProvider,
} from './contexts';
import { createClient, Provider } from 'urql';
import { getWebServerUrl } from './utils/api';
import './styles/themes.scss';
import './styles/styles.scss';

const client = createClient({
  url: `${getWebServerUrl()}/graphql`,
});

const App: React.FC = () => {
    return (
        <Provider value={client}>
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
        </Provider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
