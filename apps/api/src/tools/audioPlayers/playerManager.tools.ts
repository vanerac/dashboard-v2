import { Track } from '../../../../../packages/services';
import { AudioPlayer } from './AudioPlayer';
import { Response } from 'express';
import { Providers, UUID } from '../types';
import Pool from '../database.tools';
import SpotifyAudioPlayer from './spotifyPlayer';
import { AddressInfo } from 'net';
import { v4 as uuidv4 } from 'uuid';
import { createWebSocketStream, WebSocketServer } from 'ws';
import { Duplex, pipeline } from 'stream';

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
    // private devices: Map<UUID, { deviceId: UUID; ref: Socket; isActive: boolean }[]> = new Map();
    private devices: {
        deviceId: UUID;
        userId: UUID;
        ref: Duplex;
        isActive: boolean;
    }[] = [];
    // private queue: Map<UUID, Track[]> = new Map();
    private servers = new Map<UUID, { server: WebSocketServer; port: number; url: string }>();

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

            const [{ accesstoken: accessToken }] = rows;

            let audioPlayer: AudioPlayer | undefined;

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
            uri: '',
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
        const device = this.devices.find((device) => device.userId === userId && device.isActive);
        if (!device) {
            throw new Error('No active device');
        }
        const player = await this.getPlayer(userId, track.provider, serviceId);
        if (!player) {
            throw new Error('Could not instantiate player');
        }

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
        const stream = await player.getStream();
        pipeline(stream, device.ref, () => {
            console.log('[playerManager] pipe closed, stopping player');
            player.pause();
        });
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

    public getAvailableDevices(userId: UUID) {
        return this.devices
            .filter((device) => device.userId === userId)
            .map((device) => ({ deviceId: device.deviceId, isActive: device.isActive }));
    }

    public getCurrentDevice(userId: UUID) {
        const device = this.devices.find((device) => device.userId === userId && device.isActive);
        return device ? { deviceId: device.deviceId, isActive: device.isActive } : null;
    }

    public async changeDevice(userId: UUID, deviceId: UUID) {
        // if active player, redirect audio to new device
        const index = this.audioPlayers.findIndex((player) => player.userId === userId && player.isActive);
        const device = this.devices.find((device) => device.userId === userId && device.deviceId === deviceId);
        if (!device) {
            throw new Error('Device not found');
        }
        if (index !== -1) {
            const { player } = this.audioPlayers[index];
            const stream = await player.getStream();
            pipeline(stream, device.ref, () => {
                console.log('[playerManager] pipe closed, stopping player');
                player.pause();
            });

            this.devices.forEach((device, index) => {
                this.devices[index].isActive = device.deviceId === deviceId;
            });

            // emit global event
        }
    }

    private handleDevice(userId: UUID, stream: Duplex) {
        const deviceId = uuidv4();
        this.devices.push({
            userId,
            ref: stream,
            deviceId: deviceId,
            isActive: true,
        });
        console.log(`Device connected: ${deviceId}`);
    }

    // Returns an url to let the player register a new device
    public async registerDevice(userId: UUID): Promise<string> {
        if (this.servers.has(userId)) {
            const server = this.servers.get(userId);
            if (server) return server?.url;
            throw new Error('Server not found');
        } else {
            let wss;
            await new Promise((resolve) => {
                wss = new WebSocketServer({ port: 0 }, resolve as any);
            });

            if (!wss) throw new Error('Server not found');
            wss = wss as WebSocketServer;

            wss.on('connection', (ws) => {
                const duplex = createWebSocketStream(ws);
                this.handleDevice(userId, duplex);
            });

            wss.on('error', (err) => {
                console.log(err);
            });
            const serverConfig = {
                port: (wss.address() as AddressInfo)?.port,
                server: wss,
                url: `ws://localhost:${(wss.address() as AddressInfo)?.port}`,
            };

            this.servers.set(userId, serverConfig);
            this.servers.get(userId)?.server.on('close', () => {
                this.servers.delete(userId);
                this.devices = this.devices.filter((device) => device.userId !== userId);
            });
            return serverConfig.url;
        }
    }
}
