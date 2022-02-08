import { Request, Response } from 'express';
import PlayerManager from '../../tools/audioPlayers/playerManager.tools';
import { UUID } from '../../tools/types';

const playerManager = new PlayerManager();

export default class PlaybackController {
    public static async getCurrentSong(req: Request, res: Response) {
        const { user } = req.session;
        const state = playerManager.getCurrentTrack(user?.id as string);
        return res.json(state);
    }

    // Queue Controls

    public static async addToQueue(req: Request, res: Response) {
        const { user } = req.session;
        const { track } = req.body;
        playerManager.addToQueue(user?.id as string, track);
        return res.json({});
    }

    public static async getQueue(req: Request, res: Response) {
        const { user } = req.session;
        const queue = playerManager.getQueue(user?.id as string);
        return res.json(queue);
    }

    public static async removeFromQueue(req: Request, res: Response) {
        const { user } = req.session;
        const { track } = req.body;
        playerManager.removeFromQueue(user?.id as string, track);
        return res.json({});
    }

    public static async moveInQueue(req: Request, res: Response) {
        const { user } = req.session;
        const { track, index } = req.body;
        playerManager.moveInQueue(user?.id as string, track, index);
        return res.json({});
    }

    public static async clearQueue(req: Request, res: Response) {
        const { user } = req.session;
        playerManager.clearQueue(user?.id as string);
        return res.json({});
    }

    // Updates

    public static async subscribeToUpdates($req: Request, $res: Response) {}

    // Playback Control

    public static async playTrack(req: Request, res: Response) {
        const { user } = req.session;
        const { track } = req.body;
        await playerManager.play(user?.id as string, track);
        return res.json({});
    }

    public static async resumeSong(req: Request, res: Response) {
        const { user } = req.session;
        await playerManager.resume(user?.id as string);
        return res.json({});
    }

    public static async pausePlayback(req: Request, res: Response) {
        const { user } = req.session;
        await playerManager.pause(user?.id as string);
        return res.json({});
    }

    public static async skipTrack(req: Request, res: Response) {
        const { user } = req.session;
        await playerManager.skip(user?.id as string);
        return res.json({});
    }

    public static async previousTrack(req: Request, res: Response) {
        const { user } = req.session;
        await playerManager.previous(user?.id as string);
        return res.json({});
    }

    public static async stopPlayback(req: Request, res: Response) {
        const { user } = req.session;
        await playerManager.stop(user?.id as string);
        return res.json({});
    }

    public static async setVolume(req: Request, res: Response) {
        const { user } = req.session;
        const { volume } = req.body;
        await playerManager.setVolume(user?.id as string, volume as number);
        return res.json({});
    }

    public static async setRepeatMode(req: Request, res: Response) {
        const { user } = req.session;
        const { mode } = req.body;
        await playerManager.setRepeatMode(user?.id as string, mode as boolean);
        return res.json({});
    }

    public static async setShuffleMode(req: Request, res: Response) {
        const { user } = req.session;
        const { mode } = req.body;
        await playerManager.setShuffleMode(user?.id as string, mode as boolean);
        return res.json({});
    }

    public static async setQuality(req: Request, res: Response) {
        const { user } = req.session;
        const { quality } = req.body;
        await playerManager.setQuality(user?.id as string, quality as string);
        return res.json({});
    }

    public static async seekTrack(req: Request, res: Response) {
        const { user } = req.session;
        const { position } = req.body;
        await playerManager.seek(user?.id as string, position as number);
        return res.json({});
    }

    // Device Control

    public static async getAvailableDevices(req: Request, res: Response) {
        const { user } = req.session;
        const devices = await playerManager.getAvailableDevices(user?.id as string);
        return res.json(devices);
    }

    public static async getCurrentDevice(req: Request, res: Response) {
        const { user } = req.session;
        const device = await playerManager.getCurrentDevice(user?.id as string);
        return res.json(device);
    }

    public static async changeDevice(req: Request, res: Response) {
        const { user } = req.session;
        const { device } = req.body;
        await playerManager.changeDevice(user?.id as string, device as UUID);
        return res.json({});
    }

    public static async registerDevice(req: Request, res: Response) {
        // Todo: see if there isnt a better way of doing this
        const { user } = req.session;
        await playerManager.registerDevice(user?.id as string, res);
        return res.json({});
    }
}
