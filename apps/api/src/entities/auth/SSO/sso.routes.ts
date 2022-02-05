import { Router } from 'express';
import GoogleRoutes from './google/google.routes';
import SpotifyRoutes from './spotify/spotify.routes';

const router = Router();

router.use('/google', GoogleRoutes);
router.use('/spotify', SpotifyRoutes);

export default router;
