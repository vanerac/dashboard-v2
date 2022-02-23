import { Router } from 'express';
import GoogleRoutes from './google/google.routes';
import SpotifyRoutes from './spotify/spotify.routes';
import DeezerRoutes from './deezer/deezer.routes';
import LastfmRoutes from './lastfm/lastfm.routes';
import AppleRoutes from './apple/apple.routes';

const router = Router();

router.use('/google', GoogleRoutes);
router.use('/spotify', SpotifyRoutes);
router.use('/deezer', DeezerRoutes);
router.use('/lastfm', LastfmRoutes);
router.use('/apple', AppleRoutes);

export default router;
