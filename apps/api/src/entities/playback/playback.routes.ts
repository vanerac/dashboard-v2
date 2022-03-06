import { NextFunction, Request, Response, Router } from 'express';
import PlaybackController from './playback.controller';
import { parseServiceId } from '../../tools/service.tools';
import configuration from '../../../configuration';

const router = Router();

const playerIsEnabled = (req: Request, res: Response, next: NextFunction) => {
    if (configuration.playerEnabled) next();
    else res.status(403).send('Player is disabled');
};

router.use(playerIsEnabled);

// Queue Control
router.get('/currentState', PlaybackController.getCurrentSong);
router.get('/queue', PlaybackController.getQueue);
router.post('/queue/add', PlaybackController.addToQueue);
router.post('/queue/delete', PlaybackController.removeFromQueue);
router.put('/queue/move', PlaybackController.moveInQueue);
router.delete('/queue/clear', PlaybackController.clearQueue);

// Open WS connection that will be used to send events to the client
router.get('/listen', PlaybackController.subscribeToUpdates);

// Playback control
router.post('/play/:serviceId', parseServiceId, PlaybackController.playTrack);
router.get('/resume', PlaybackController.resumeSong);
router.get('/pause', PlaybackController.pausePlayback);
router.get('/skip', PlaybackController.skipTrack);
router.get('/prev', PlaybackController.previousTrack);
router.get('/stop', PlaybackController.stopPlayback);
router.put('/volume', PlaybackController.setVolume);
router.put('/repeat', PlaybackController.setRepeatMode);
router.put('/shuffle', PlaybackController.setShuffleMode);
router.put('/quality', PlaybackController.setQuality);
router.put('/seek', PlaybackController.seekTrack);

// Device control
router.get('/devices', PlaybackController.getAvailableDevices); // All connected devices linked to a user
router.get('/device/current', PlaybackController.getCurrentDevice); // Current isActive playback device
router.put('/device/change', PlaybackController.changeDevice); // set the device that should receive the playback stream
router.post('/device/register', PlaybackController.registerDevice); // Connect to API and recieve stream

export default router;
