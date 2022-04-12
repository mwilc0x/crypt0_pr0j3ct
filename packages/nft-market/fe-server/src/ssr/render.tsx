import React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import App from './App';
import { ABORT_DELAY } from '../util';

const renderToPipeableStream = (ReactDOMServer as any).renderToPipeableStream;

// In a real setup, you'd read it from webpack build stats.
let assets = {
    'main.js': '/main.js',
    'main.css': '/main.css',
};

export default function render(url, res) {
    // The new wiring is a bit more involved.
    res.socket.on('error', error => {
      console.error('Fatal', error);
    });
  
    let didError = false;
  
    const {pipe, abort} = renderToPipeableStream(
      <App assets={assets} />,
      {
        bootstrapScripts: [assets['main.js']],
        onShellReady() {
          // If something errored before we started streaming, we set the error code appropriately.
          res.statusCode = didError ? 500 : 200;
          res.setHeader('Content-type', 'text/html');
          pipe(res);
        },
        onShellError(x) {
          // Something errored before we could complete the shell so we emit an alternative shell.
          res.statusCode = 500;
          res.send('<!doctype><p>Error</p>');
        },
        onError(x) {
          didError = true;
          console.error(x);
        },
      }
    );
  
    // Abandon and switch to client rendering if enough time passes.
    // Try lowering this to see the client recover.
    setTimeout(abort, ABORT_DELAY);
}
