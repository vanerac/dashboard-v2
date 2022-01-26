import { Router } from 'express';
import GoogleRoutes from './google/google.routes';

const router = Router();

router.use('/google', GoogleRoutes);

export default router;
