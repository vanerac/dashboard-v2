import { Router } from 'express';
import ServiceController from './service.controller';

const router = Router();

router.get('/:id', ServiceController.getServicesById);
router.get('/', ServiceController.getAllServices);
// router.post('/', ServiceController.createService);
router.put('/:id', ServiceController.updateService);
router.delete('/:id', ServiceController.deleteService);

export default router;
