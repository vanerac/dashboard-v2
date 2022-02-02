import { Router } from 'express';
import AuthRoutes from './auth/auth.routes';
import ServiceRoutes from './services/service.router';
import { parseToken, verifyToken } from '../tools/auth.tools';

const router = Router();

router.use('/auth', parseToken, AuthRoutes);
router.use('/service', verifyToken, ServiceRoutes);

export default router;
