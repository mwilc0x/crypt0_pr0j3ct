import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    console.log(req.params);

    try {
      res.status(200).json({ letsGo: true });
    } catch (error: any) {
      res.status(500);
    }
});

export default router;
