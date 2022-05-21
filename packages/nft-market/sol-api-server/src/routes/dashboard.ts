import { json, Request, Response, Router } from 'express';
import { hashImage } from '../util';
import DashboardUI from '../dashboard-ui';

const router = Router();
router.use(json({ limit: '100mb' }));

router.get('/login', (req: Request, res: Response) => {
    try {
      DashboardUI();
      res.status(200).json({ success: true, data: {} });
    } catch (error: any) {
      res.status(500);
    }
});

export default router;
