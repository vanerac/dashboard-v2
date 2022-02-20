import { Router } from 'express';
import GoogleRoutes from './google/google.routes';
import SpotifyRoutes from './spotify/spotify.routes';
import DeezerRoutes from './deezer/deezer.routes';

const router = Router();

router.use('/google', GoogleRoutes);
router.use('/spotify', SpotifyRoutes);
router.use('/deezer', DeezerRoutes);

export default router;
