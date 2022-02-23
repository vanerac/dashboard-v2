import { Router } from 'express';
import TrackController from './track.controller';

const router = Router();

router.get('/:trackId', TrackController.getById);
router.get('/:trackId/getAlbum', TrackController.getAlbum);
router.get('/:trackId/getArtist', TrackController.getArtist);

router.post('/:trackId/like', TrackController.like);
router.post('/:trackId/unlike', TrackController.unlike);

router.post('/:trackId/addToPlaylist/', TrackController.addToPlaylist);
router.post('/:trackId/removeFromPlaylist/', TrackController.removeFromPlaylist);

export default router;
