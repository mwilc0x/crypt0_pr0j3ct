import React from 'react';
import Home from '@crypto-org/nft-market-client/src/pages/Home';
import Html from './Html';

export default function App({assets}) { 
  return (
    <Html assets={assets} title="Hello">
      <h1>React 18 stream</h1>
      <Home />
    </Html>
  );
}
