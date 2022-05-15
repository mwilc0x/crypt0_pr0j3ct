import { json, Request, Response, Router } from 'express';

const router = Router();
router.use(json({ limit: '100mb' }));

router.get('/', (req: Request, res: Response) => {
    console.log('TEST');
    try {
      res.status(200).json({ success: true, data: { test: '123' } });
    } catch (error: any) {
      res.status(500);
    }
});

export default router;
