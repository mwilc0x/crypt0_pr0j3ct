import React from 'react';
import Test from '@crypto-org/nft-market-client/src/components/Test';
import Html from './Html';

export default function App({assets}) { 
  return (
    <Html assets={assets} title="Hello">
      <h1>React 18 stream</h1>
      <Test />
    </Html>
  );
}
