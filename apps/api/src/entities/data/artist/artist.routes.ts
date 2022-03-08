import { Router } from 'express';
import ArtistController from './artist.controller';

const router = Router();

router.get('/id/:id', ArtistController.getArtistById);
router.get('/followed', ArtistController.getFollowedArtists);
router.get('/:id/follow', ArtistController.followArtist);
router.get('/:id/unfollow', ArtistController.unfollowArtist);
router.get('/:id/albums', ArtistController.getArtistAlbums);
router.get('/:id/playlists', ArtistController.getArtistPlaylists);
router.get('/:id/related', ArtistController.getArtistRelatedArtists);
router.get('/:id/top-tracks', ArtistController.getArtistTopTracks);

export default router;
