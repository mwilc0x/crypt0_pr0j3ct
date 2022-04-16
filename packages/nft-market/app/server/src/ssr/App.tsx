import React from 'react';
import Html from './Html';
import Test from '@crypto-org-site/client/src/components/Test';

export default ({assets}) => { 
  return (
    <Html assets={assets} title="Hello">
      <h1>React 18 stream</h1>
      <Test />
    </Html>
  );
}
