import { Request, Response, Router } from 'express';
import { renderToNodeStream } from 'react-dom/server';

const router = Router();

router.get('/', (_: Request, res: Response) => {
  console.log(renderToNodeStream);
    try {
      res.status(200);
      res.setHeader("Content-Type", "text/html");
      res.send(`<h1>hi!</h1>`);    
    } catch (error: any) {
      console.error('contract error');
      res.status(500);
    }
});

function render(res) {

}

export default router;
