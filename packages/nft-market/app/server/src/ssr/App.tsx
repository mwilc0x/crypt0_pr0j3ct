import React from 'react';
import Html from './Html';

export default ({assets}) => { 
  return (
    <Html assets={assets} title="Hello">
      <h1>React 18 stream</h1>
    </Html>
  );
}
