import { Router } from 'express';
import AppleController from './apple.controller';

const router = Router();

router.get('/login', AppleController.getCode);
router.get('/callback', AppleController.getToken);

export default router;
