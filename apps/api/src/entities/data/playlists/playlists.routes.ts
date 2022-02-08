import { Router } from 'express';
import PlaylistsController from './playlists.controller';

const router = Router();

// set playlist cover art

router.get('/', PlaylistsController.getAll);
router.get('/:id', PlaylistsController.getOne);
router.get('/:id/tracks', PlaylistsController.getTracks);
router.post('/create', PlaylistsController.create);
router.put('/:id/update', PlaylistsController.update);
router.delete('/:id/delete', PlaylistsController.delete);

export default router;
