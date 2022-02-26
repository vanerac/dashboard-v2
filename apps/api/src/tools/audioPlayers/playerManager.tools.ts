import { Track } from '../../../../../packages/services';
import { AudioPlayer } from './AudioPlayer';
import { Response } from 'express';
import { Providers, UUID } from '../types';
import Pool from '../database.tools';
import SpotifyAudioPlayer from './spotifyPlayer';

export default class PlayerManager {
    /* Notes:
     * The player manager is responsible for managing the audio players.
     * It is responsible for creating, destroying, and updating the audio players.
     */

    private audioPlayers: {
        userId: UUID;
        serviceId: UUID;
        provider: string;
        player: AudioPlayer;
        isActive: boolean;
    }[] = [];
    // Device becomes ws
    // private devices: Map<UUID, { deviceId: UUID; ref: Response; isActive: boolean }[]> = new Map();
    // private queue: Map<UUID, Track[]> = new Map();

    constructor() {}

    private async getPlayer(userId: UUID, provider: string, serviceId: UUID): Promise<AudioPlayer> {
        const player = this.audioPlayers.find(
            (player) => player.userId === userId && player.provider === provider && player.serviceId === serviceId,
        );
        if (!player) {
            // Todo replace this by wrapper function that refreshes token
            const query = `SELECT accessToken FROM services WHERE id = $1`;
            const values = [serviceId];
            const { rows } = await Pool.query(query, values);
            if (rows.length === 0) {
                throw new Error('Service not found');
            }
            console.log('rows', rows);
            const [{ accesstoken: accessToken }] = rows;
            console.log('accessToken', accessToken);
            let audioPlayer: AudioPlayer | undefined;
            console.log(provider);
            switch (provider) {
                case Providers.SPOTIFY:
                    audioPlayer = new SpotifyAudioPlayer(accessToken);
                    break;
                default:
                    audioPlayer = undefined;
            }
            if (!audioPlayer) {
                throw new Error('Could not create audio player');
            }
            audioPlayer.on('error', (err) => {
                console.log('[playerManager] error', err);
            });
            this.audioPlayers.push({ userId, provider, player: audioPlayer, isActive: false, serviceId: serviceId });
            return audioPlayer;
        } else {
            return player.player;
        }
    }

    // Queue control
    public getCurrentTrack($userId: UUID): Track {
        // TODO Handles with audioPlayer;
        return {
            image: '',
            playable: false,
            type: 'track',
            id: '',
            name: '',
            artist: '',
            album: '',
            duration: 0,
            provider: '',
        };
    }

    public addToQueue($userId: UUID, $track: Track) {
        // if (!this.queue.has(userId)) {
        //     this.queue.set(userId, []);
        // }
        // this.queue.get(userId)?.push(track);
    }

    public removeFromQueue($userId: UUID, $track: Track) {
        // Todo: Note: this might not work since we are recreating the object every time
        // if (this.queue.has(userId)) {
        //     const tracks = this.queue.get(userId);
        //     tracks?.splice(tracks.indexOf(track), 1);
        // }
    }

    public clearQueue($userId: UUID) {
        // if (this.queue.has(userId)) {
        //     this.queue.delete(userId);
        // }
    }

    public getQueue($userId: UUID): Track[] | void {
        // return this.queue.get(userId);
    }

    public moveInQueue($userId: UUID, $track: Track, $index: number) {
        // if (this.queue.has(userId)) {
        //     const tracks = this.queue.get(userId);
        //     tracks?.splice(index, 0, track);
        // }
    }

    // Update Controls

    public listenForUpdates($userId: UUID, $res: Response) {
        // Stream updates data from users player manager
        // Includes:
        // - Playback status
        // - device updates (change isActive)
    }

    // Playback control

    public async play(userId: UUID, track: Track, serviceId: UUID) {
        // Todo Play track
        // get player linked tu user and from track provider
        // play track
        const player = await this.getPlayer(userId, track.provider, serviceId);
        if (player) {
            await this.pause(userId);
            const index = this.audioPlayers.findIndex(
                (player) =>
                    player.serviceId === serviceId && player.userId === userId && player.provider === track.provider,
            );
            const activeIndex = this.audioPlayers.findIndex(
                (player) => player.serviceId === serviceId && player.userId === userId && player.isActive,
            );
            if (index !== activeIndex) {
                if (activeIndex !== -1) {
                    this.audioPlayers[activeIndex].isActive = false;
                }
                this.audioPlayers[index].isActive = true;
            }
            await player.play(track);
        }
    }

    public async pause($userId: UUID) {
        // Todo Pause track
        const index = this.audioPlayers.findIndex((player) => player.userId === $userId && player.isActive);
        if (index !== -1) {
            const player = this.audioPlayers[index];
            await player.player.pause();
        }
    }

    public async resume($userId: UUID) {
        // Todo Resume track
        const index = this.audioPlayers.findIndex((player) => player.userId === $userId && player.isActive);
        if (index !== -1) {
            const player = this.audioPlayers[index];
            await player.player.resume();
        }
    }

    public async stop($userId: UUID) {
        // Todo Stop track
        const index = this.audioPlayers.findIndex((player) => player.userId === $userId && player.isActive);
        if (index !== -1) {
            const player = this.audioPlayers[index];
            this.audioPlayers[index].isActive = false;
            await player.player.stop();
        }
    }

    public async seek($userId: UUID, $time: number) {
        // Todo Seek track
        // const index = this.audioPlayers.findIndex((player) => player.userId === $userId && player.isActive);
        // if (index !== -1) {
        //     const player = this.audioPlayers[index];
        //     await player.player.seek($time);
        // }
    }

    public async skip($userId: UUID) {
        // Todo Skip track
        // const index = this.audioPlayers.findIndex((player) => player.userId === $userId && player.isActive);
        // if (index !== -1) {
        //     const player = this.audioPlayers[index];
        //     await player.player.skip();
        // }
    }

    public async previous($userId: UUID) {
        // Todo Previous track
        // const index = this.audioPlayers.findIndex((player) => player.userId === $userId && player.isActive);
        // if (index !== -1) {
        //     const player = this.audioPlayers[index];
        //     await player.player.previous();
        // }
    }

    public async setVolume($userId: UUID, $volume: number) {
        // Todo Set volume
        // const index = this.audioPlayers.findIndex((player) => player.userId === $userId && player.isActive);
        // if (index !== -1) {
        //     const player = this.audioPlayers[index];
        //     await player.player.setVolume($volume);
        // }
    }

    public async setRepeatMode($userId: UUID, $repeat: boolean) {
        // Todo Repeat track
        // const index = this.audioPlayers.findIndex((player) => player.userId === $userId && player.isActive);
        // if (index !== -1) {
        //     const player = this.audioPlayers[index];
        //     await player.player.setRepeatMode($repeat);
        // }
    }

    public async setShuffleMode($userId: UUID, $shuffle: boolean) {
        // Todo Shuffle track
        // const index = this.audioPlayers.findIndex((player) => player.userId === $userId && player.isActive);
        // if (index !== -1) {
        //     const player = this.audioPlayers[index];
        //     await player.player.setShuffleMode($shuffle);
        // }
    }

    public async setQuality($userId: UUID, $quality: string) {
        // Todo Set quality
        // const index = this.audioPlayers.findIndex((player) => player.userId === $userId && player.isActive);
        // if (index !== -1) {
        //     const player = this.audioPlayers[index];
        //     await player.player.setQuality($quality);
        // }
    }

    // Device control

    public getAvailableDevices($userId: UUID) {
        // if (!this.devices.has(userId)) {
        //     return undefined;
        // }
        // const devices = this.devices.get(userId);
        // devices?.map((device) => ({
        //     deviceId: device.deviceId,
        //     isActive: device.isActive,
        // }));
        // return devices;
    }

    public getCurrentDevice($userId: UUID) {
        // // Todo Get current device
        // if (!this.devices.has(userId)) {
        //     return undefined;
        // }
        // const devices = this.devices.get(userId);
        // return devices?.find((device) => device.isActive);
    }

    public changeDevice($userId: UUID, $deviceId: UUID) {
        // Todo Change device
        // if (!this.devices.has(userId)) {
        //     return undefined;
        // }
        // const active = this.devices.get(userId)?.find((device) => device.isActive);
        // if (active) {
        //     active.isActive = false;
        // }
        // const device = this.devices.get(userId)?.find((device) => device.deviceId === deviceId);
        // if (device) {
        //     device.isActive = true;
        // }
    }

    public registerDevice($userId: UUID, $device: Response) {
        // const deviceId = ''; // ||uuid();
        // if (!this.devices.has(userId)) {
        //     this.devices.set(userId, []);
        // }
        // // todo: create ws
        // this.devices.get(userId)?.push({ deviceId, ref: device, isActive: false });
        // this.changeDevice(userId, deviceId);
    }
}
