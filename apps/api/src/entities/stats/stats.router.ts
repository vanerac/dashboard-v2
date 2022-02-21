import { Router } from 'express';
import { hasService } from '@tools/service.tools';
import StatsController from './stats.controller';

const router = Router();

router.get('/me/top/artists', hasService('lastfm'), StatsController.myTopArtists);
router.get('/me/top/tracks', hasService('lastfm'), StatsController.myTopTracks);
router.get('/me/top/albums', hasService('lastfm'), StatsController.myTopAlbums);
router.get('/me/top/tags', hasService('lastfm'), StatsController.myTopTags);

router.get('/charts/top/artists/weekly', hasService('lastfm'), StatsController.chartsWeeklyTopArtists);
router.get('/charts/top/tracks/weekly', hasService('lastfm'), StatsController.chartsWeeklyTopTracks);
router.get('/charts/top/albums/weekly', hasService('lastfm'), StatsController.chartsWeeklyTopAlbums);

// user radio
// get similar artists

export default router;
