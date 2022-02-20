import { Router } from 'express';
import PlaylistsRoutes from './playlists/playlist.routes';
import SearchRoutes from './search/search.routes';
import ArtistRoutes from './artist/artist.routes';
import TrackRoutes from './track/track.routes';

const router = Router();

router.use('/playlist', PlaylistsRoutes);
router.use('/search', SearchRoutes);
router.use('/artist', ArtistRoutes);
router.use('/track', TrackRoutes);

export default router;
