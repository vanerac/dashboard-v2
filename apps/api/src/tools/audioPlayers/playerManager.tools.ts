import { Track } from '../../../../../packages/services';
import { AudioPlayer } from './AudioPlayer';
import { Response } from 'express';
import { Providers, UUID } from '../types';

export default class PlayerManager {
    /* Notes:
     * The playermanger is responsible for managing the audio players.
     * It is responsible for creating, destroying, and updating the audio players.
     */

    private audioPlayers: { userId: UUID; players: { provider: Providers; player: AudioPlayer }[] }[] = [];
    private devices: Map<UUID, { deviceId: UUID; ref: Response; isActive: boolean }[]> = new Map();
    private queue: Map<UUID, Track[]> = new Map();
    constructor() {}

    // Queue control

    public getCurrentTrack(userId: UUID): Track {
        // TODO Handles with audioPlayer;
        return {
            id: '',
            name: '',
            artist: '',
            album: '',
            duration: 0,
            provider: '',
        };
    }

    public addToQueue(userId: UUID, track: Track) {
        if (!this.queue.has(userId)) {
            this.queue.set(userId, []);
        }
        this.queue.get(userId)?.push(track);
    }

    public removeFromQueue(userId: UUID, track: Track) {
        // Todo: Note: this might not work since we are recreating the object every time
        if (this.queue.has(userId)) {
            const tracks = this.queue.get(userId);
            tracks?.splice(tracks.indexOf(track), 1);
        }
    }

    public clearQueue(userId: UUID) {
        if (this.queue.has(userId)) {
            this.queue.delete(userId);
        }
    }

    public getQueue(userId: UUID): Track[] | undefined {
        return this.queue.get(userId);
    }

    public moveInQueue(userId: UUID, track: Track, index: number) {
        if (this.queue.has(userId)) {
            const tracks = this.queue.get(userId);
            tracks?.splice(index, 0, track);
        }
    }

    // Update Controls

    public listenForUpdates(userId: UUID, res: Response) {
        // Stream updates data from users player manager
        // Includes:
        // - Playback status
        // - device updates (change active)
    }

    // Playback control

    public async play(userId: UUID, track: Track) {
        // Todo Play track
    }

    public async pause(userId: UUID) {
        // Todo Pause track
    }

    public async resume(userId: UUID) {
        // Todo Resume track
    }

    public async stop(userId: UUID) {
        // Todo Stop track
    }

    public async seek(userId: UUID, time: number) {
        // Todo Seek track
    }

    public async skip(userId: UUID) {
        // Todo Skip track
    }

    public async previous(userId: UUID) {
        // Todo Previous track
    }

    public async setVolume(userId: UUID, volume: number) {
        // Todo Set volume
    }

    public async setRepeatMode(userId: UUID, repeat: boolean) {
        // Todo Repeat track
    }

    public async setShuffleMode(userId: UUID, shuffle: boolean) {
        // Todo Shuffle track
    }

    public async setQuality(userId: UUID, quality: string) {
        // Todo Set quality
    }

    // Device control

    public getAvailableDevices(userId: UUID) {
        if (!this.devices.has(userId)) {
            return undefined;
        }
        const devices = this.devices.get(userId);
        devices?.map((device) => ({
            deviceId: device.deviceId,
            isActive: device.isActive,
        }));
        return devices;
    }

    public getCurrentDevice(userId: UUID) {
        // Todo Get current device
        if (!this.devices.has(userId)) {
            return undefined;
        }
        const devices = this.devices.get(userId);
        return devices?.find((device) => device.isActive);
    }

    public changeDevice(userId: UUID, deviceId: UUID) {
        // Todo Change device
        if (!this.devices.has(userId)) {
            return undefined;
        }
        const active = this.devices.get(userId)?.find((device) => device.isActive);
        if (active) {
            active.isActive = false;
        }
        const device = this.devices.get(userId)?.find((device) => device.deviceId === deviceId);
        if (device) {
            device.isActive = true;
        }
    }

    public registerDevice(userId: UUID, device: Response) {
        const deviceId = uuid();
        if (!this.devices.has(userId)) {
            this.devices.set(userId, []);
        }
        this.devices.get(userId)?.push({ deviceId, ref: device, isActive: false });
        this.changeDevice(userId, deviceId);
    }
}
