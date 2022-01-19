import { Router } from 'express';
import GoogleController from './google.controller';

const router = Router();

router.post('/login', GoogleController.getCode);
router.post('/callback', GoogleController.getToken);

export default router;
