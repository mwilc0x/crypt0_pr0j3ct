import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (_: Request, res: Response) => {
    try {
      res.status(200);
      res.setHeader("Content-Type", "text/html");
      res.send(`<h1>hi!</h1>`);    
    } catch (error: any) {
      console.error('contract error');
      res.status(500);
    }
});

export default router;
