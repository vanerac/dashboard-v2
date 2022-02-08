import { Router } from 'express';
import PlaylistsRoutes from './playlists/playlists.routes';
import SearchRoutes from './search/search.routes';

const router = Router();

router.use('/playlist', PlaylistsRoutes);
router.use('/search', SearchRoutes);

export default router;
