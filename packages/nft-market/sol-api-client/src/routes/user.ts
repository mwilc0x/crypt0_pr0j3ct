import { json, Router } from 'express';
import * as controller from '../controllers/user';
import { authJwt } from '../middleware';

const router = Router();
router.use(json({ limit: '100mb' }));

router.get('/api/test/all', controller.allAccess);
router.get('/api/test/user', [authJwt.verifyToken], controller.userBoard);
router.get('/api/test/mod', [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);
router.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

export default router;
