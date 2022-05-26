import { json, Request, Response, Router } from 'express';

const router = Router();
router.use(json({ limit: '100mb' }));

router.get('/', (req: Request, res: Response) => {
    console.log('tunnel service')
    try {
      res.status(200).json({ success: true, data: {} });
    } catch (error: any) {
      res.status(500);
    }
});

export default router;
