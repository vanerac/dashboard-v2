import { Router } from 'express';
import AuthController from './auth.controller';
import GoogleRoutes from './SSO/google/google.routes';
import SsoRoutes from './SSO/sso.routes';

const router = Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

router.use('/sso', SsoRoutes);
export default router;
