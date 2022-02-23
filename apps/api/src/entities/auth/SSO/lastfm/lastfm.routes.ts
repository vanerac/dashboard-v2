import { Router } from 'express';
import LastFmController from './lastfm.controller';

const router = Router();

router.get('/login', LastFmController.getCode);
router.get('/callback', LastFmController.getToken);

export default router;
