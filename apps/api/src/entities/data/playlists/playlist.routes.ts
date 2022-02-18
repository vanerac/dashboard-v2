import { Router } from 'express';
import PlaylistController from './playlist.controller';

const router = Router();

// set playlist cover art

router.get('/', PlaylistController.getAll);
router.get('/:id', PlaylistController.getOne);
router.get('/:id/tracks', PlaylistController.getTracks);
router.post('/create', PlaylistController.create);
router.put('/:id/update', PlaylistController.update);
router.delete('/:id/delete', PlaylistController.delete);

export default router;
