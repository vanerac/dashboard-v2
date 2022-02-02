import { Router } from 'express';
import PlaylistsController from './playlists.controller';

const router = Router();

router.get('/', PlaylistsController.getAll);
// router.get('/:id', PlaylistsController.getOne);
// router.post('/', PlaylistsController.create);
// router.put('/:id', PlaylistsController.update);
// router.delete('/:id', PlaylistsController.remove);

export default router;
