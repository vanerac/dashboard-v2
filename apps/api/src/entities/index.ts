import { Router } from 'express';
import AuthRoutes from './auth/auth.routes';
import ServiceRoutes from './services/service.router';

const router = Router();

router.use('/auth', AuthRoutes);
router.use('/service', ServiceRoutes);

export default router;
