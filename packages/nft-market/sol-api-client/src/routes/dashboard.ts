import { json, Request, Response, Router } from 'express';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import App from '../app';

const router = Router();
router.use(json({ limit: '100mb' }));

router.get('/', (req: Request, res: Response) => {
    console.log('howdy', process.env.POSTGRES_HOST, process.env.POSTGRES_PORT)
    try {
      let didError = false;
      const stream = renderToPipeableStream(
        App({ url: req.url }),
        {
          onShellReady() {
            // The content above all Suspense boundaries is ready.
            // If something errored before we started streaming, we set the error code appropriately.
            res.statusCode = didError ? 500 : 200;
            res.setHeader('Content-type', 'text/html');
            stream.pipe(res);
          },
          onShellError(error) {
            // Something errored before we could complete the shell so we emit an alternative shell.
            res.statusCode = 500;
            res.send(
              '<!doctype html><p>Loading...</p>'
            );
          },
          onAllReady() {
            // If you don't want streaming, use this instead of onShellReady.
            // This will fire after the entire page content is ready.
            // You can use this for crawlers or static generation.
      
            // res.statusCode = didError ? 500 : 200;
            // res.setHeader('Content-type', 'text/html');
            // stream.pipe(res);
          },
          onError(err) {
            didError = true;
            console.error(err);
          },
        }
      );
    } catch (error: any) {
      res.status(500);
    }
});

export default router;
