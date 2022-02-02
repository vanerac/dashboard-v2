import { Router } from 'express';
import AuthRoutes from './auth/auth.routes';
import ServiceRoutes from './services/service.router';
import { parseToken } from '../tools/auth.tools';

const router = Router();

router.use('/auth', parseToken, AuthRoutes);
router.use('/service', ServiceRoutes);

export default router;
