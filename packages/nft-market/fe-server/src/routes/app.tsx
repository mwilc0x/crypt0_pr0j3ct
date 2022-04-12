import { Request, Response, Router } from 'express';
import React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import App from '../components/App';
import { ABORT_DELAY } from '../util';

const router = Router();
const renderToPipeableStream = (ReactDOMServer as any).renderToPipeableStream;

router.get('/', (req: Request, res: Response) => {
    try {
      // res.status(200);
      // res.setHeader("Content-Type", "text/html");
      // res.send(`<h1>hi!</h1>`);    
      render(req.url, res);
    } catch (error: any) {
      console.error('contract error');
      res.status(500);
    }
});

// In a real setup, you'd read it from webpack build stats.
let assets = {
  'main.js': '/main.js',
  'main.css': '/main.css',
};

function render(url, res) {
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

export default router;
