import { json, Request, Response, Router } from 'express';
import { hashImage } from '../util';
import multer from 'multer';
import path from 'path';

// Initialize Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}.${file.mimetype.split('/')[1]}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

const router = Router();
router.use(json({ limit: '100mb' }));

router.post('/save', upload.single('file'), (req: any, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'Bad input' });
    }

    res.status(200).json({ id: file.filename });
  } catch (error: any) {
    res.status(500);
  }
});

export default router;
