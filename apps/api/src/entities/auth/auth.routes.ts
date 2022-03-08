import { Router } from 'express';
import AuthController from './auth.controller';
import SsoRoutes from './SSO/sso.routes';
import { parseToken } from '../../tools/auth.tools';

const router = Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

router.use('/sso', parseToken, SsoRoutes);
export default router;
