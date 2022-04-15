import { Request, Response, Router } from 'express';
import render from '../ssr/render';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    try { 
      render(req.url, res);
    } catch (error: any) {
      console.error('contract error');
      res.status(500);
    }
});

export default router;
