import { Router } from 'express';
import SpotifyController from './spotify.controller';

const router = Router();

router.get('/login', SpotifyController.getCode);
router.get('/callback', SpotifyController.getToken);

export default router;
