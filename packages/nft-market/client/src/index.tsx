import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import TopNavigation from './components/TopNavigation';
import Footer from './components/Footer';
import Routes from './routes';
import {
    UserProvider, 
    WalletProvider,
    ThemeProvider,
    NetworkProvider,
} from './contexts';
import { Provider as GraphQLProvider } from 'urql';
import graphqlClient from './utils/graphqlClient';
import './styles/themes.scss';
import './styles/styles.scss';

const App: React.FC = () => {
    return (
        <GraphQLProvider value={graphqlClient}>
            <UserProvider>
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
            </UserProvider>
        </GraphQLProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
