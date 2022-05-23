import { json, Router } from 'express';
import * as controller from '../controllers/auth';
import { verifySignUp } from '../middleware';

const router = Router();
router.use(json({ limit: '100mb' }));

router.post(
    '/auth/signup',
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
);

router.post('/auth/signin', controller.signin);

export default router;
