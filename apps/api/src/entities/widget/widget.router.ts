import { Router } from 'express';
import WidgetController from './widget.controller';

const router = Router();

router.get('/', WidgetController.getAll);
router.put('/update-bulk', WidgetController.updateBulk);
router.get('/:id', WidgetController.getById);
router.post('/create/', WidgetController.create);
router.put('/update/:id', WidgetController.update);
router.delete('/delete/:id', WidgetController.delete);
