import { Router } from 'express';
import PlaylistsRoutes from './playlists/playlists.routes';

const router = Router();

router.use('/playlist', PlaylistsRoutes);

export default router;
