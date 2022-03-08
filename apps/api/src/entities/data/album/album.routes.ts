import { Router } from 'express';
import AlbumController from './album.controller';

const router = Router();

router.get('/', AlbumController.getAllSaved);
router.get('/:id', AlbumController.getById);
// save album
router.post('/save/:id', AlbumController.save);
// unsave album
router.delete('/unsave/:id', AlbumController.unsave);

export default router;
