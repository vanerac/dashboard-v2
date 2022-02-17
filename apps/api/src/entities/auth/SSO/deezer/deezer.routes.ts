import { Router } from 'express';
import DeezerController from './deezer.controller';

const router = Router();

router.get('/login', DeezerController.getCode);
router.get('/callback', DeezerController.getToken);

export default router;
