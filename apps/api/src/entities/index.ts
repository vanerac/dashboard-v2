import { Router } from 'express';
import AuthRoutes from './auth/auth.routes';
import ServiceRoutes from './services/service.router';
import { parseServiceId } from '../tools/service.tools';
import { parseToken } from '../tools/auth.tools';

const router = Router();

router.use('/auth', parseToken, AuthRoutes);
router.use('/service', parseServiceId, ServiceRoutes);

export default router;
