import { Router } from 'express';
import SearchController from './search.controller';

const router = Router();

router.get('/', SearchController.serviceSearch);

export default router;
