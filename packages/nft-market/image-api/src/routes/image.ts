import { json, Request, Response, Router } from 'express';

const router = Router();
router.use(json({ limit: '100mb' }));

router.get('/', (req: Request, res: Response) => {
    console.log(req.params);

    try {
      res.status(200).json({ letsGo: true });
    } catch (error: any) {
      res.status(500);
    }
});

router.post('/save', (req: Request, res: Response) => {
  console.log(req.body);

  try {
    res.status(200).json({ letsGo: true });
  } catch (error: any) {
    res.status(500);
  }
});

export default router;
