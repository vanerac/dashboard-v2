import { Router } from 'express';
import ServiceController from './service.controller';

const router = Router();

router.get('/', ServiceController.getAllServices);
router.get('/:id', ServiceController.getServicesById);
// router.post('/', ServiceController.createService);
router.put('/:id/update', ServiceController.updateService);
router.delete('/:id/delete', ServiceController.deleteService);
router.put('/:id/toggle', ServiceController.toggleService);

export default router;
