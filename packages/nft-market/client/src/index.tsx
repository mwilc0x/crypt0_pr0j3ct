import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import TopNavigation from './components/TopNavigation';
import Routes from './routes';
import {
    UserProvider, 
    WalletProvider,
    ContractProvider,
    ThemeProvider,
    WebSocketProvider
} from './contexts';
import './styles/themes.scss';
import './styles/styles.scss';

const App: React.FC = () => {
    return (
        <UserProvider>
            <WalletProvider>
                <ContractProvider>
                    <ThemeProvider>
                        <WebSocketProvider>
                            <BrowserRouter>
                                <TopNavigation />
                                <Routes />
                            </BrowserRouter>
                        </WebSocketProvider>
                    </ThemeProvider>
                </ContractProvider>
            </WalletProvider>
        </UserProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
