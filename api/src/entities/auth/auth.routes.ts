import { Router } from 'express';
import AuthController from './auth.controller';
import GoogleRoutes from './SSO/google/google.routes';

const router = Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

router.use(GoogleRoutes);
export default router;
