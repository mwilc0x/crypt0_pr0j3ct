import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';

export default ({ url }) => {
    return (
        <html>
            <head>
                <title>Solana API Dashboard</title>
            </head>
            <div>
                <h1>Based</h1>
                <StaticRouter location={url}>
                    <Routes>
                        <Route path="/" element={<App />}/>
                    </Routes>
                </StaticRouter>
            </div>
        </html>
    )
}
