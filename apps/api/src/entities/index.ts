import { Router } from 'express';
import AuthRoutes from './auth/auth.routes';
import ServiceRoutes from './services/service.routes';
import { parseToken, verifyToken } from '../tools/auth.tools';
import dataRoutes from './data/data.routes';
import { parseServiceId } from '../tools/service.tools';
import playbackRoutes from './playback/playback.routes';
import widgetRoutes from './widget/widget.routes';


const router = Router();

router.use('/auth', parseToken, AuthRoutes);
router.use('/service', verifyToken, ServiceRoutes);
router.use('/playback', verifyToken, playbackRoutes);
router.use('/data/:serviceId', [verifyToken, parseServiceId], dataRoutes);
router.use('/widget', verifyToken, widgetRoutes);

export default router;
