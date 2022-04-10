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
import { Provider as GraphQLProvider } from 'urql';
import createClient from './routes/graphqlClient';
import { getApiUrl, getWebServerUrl } from './utils/api';
import './styles/themes.scss';
import './styles/styles.scss';

const graphqlClient = createClient();

const App: React.FC = () => {
    return (
        <GraphQLProvider value={graphqlClient}>
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
        </GraphQLProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
