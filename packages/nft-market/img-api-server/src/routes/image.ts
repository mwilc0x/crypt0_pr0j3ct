import { json, Request, Response, Router } from 'express';
import { hashImage } from '../util';

const router = Router();
router.use(json({ limit: '100mb' }));

router.get('/', (req: Request, res: Response) => {
    try {
      res.status(200).json({ success: true, data: {} });
    } catch (error: any) {
      res.status(500);
    }
});

router.post('/save', (req: Request, res: Response) => {
  try {
    const image = req.body.file.data;
    const hash = hashImage(image);
    res.status(200).json({ success: true, data: { hash } });
  } catch (error: any) {
    res.status(500);
  }
});

export default router;
