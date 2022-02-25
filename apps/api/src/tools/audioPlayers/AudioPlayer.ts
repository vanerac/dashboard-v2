import { EventEmitter } from 'events';
import { Track } from '../../../../../packages/services';
import { Stream } from 'puppeteer-stream';
import { Browser, Page } from 'puppeteer';

export type AudioPlayerEvents = 'unknown' | 'ready' | 'playing' | 'pause' | 'seek' | 'stopped' | 'error';

export class AudioPlayer extends EventEmitter {
    static readonly DEFAULT_VOLUME = 1;
    static readonly DEFAULT_LOOP = false;

    protected _state: AudioPlayerEvents = 'unknown';
    protected _playingTrack: Track | null = null;

    protected _isPlaying: boolean | undefined;
    protected _isPaused: boolean | undefined;
    protected _isStopped: boolean | undefined;
    protected _currentlyPlaying: Track | undefined;
    protected _currentTime: number | undefined;
    protected _duration: number | undefined;
    protected _queue: Track[] | undefined;

    protected _browser: Browser | undefined;
    protected _page: Page | undefined;

    constructor(protected token: string) {
        super();
        this.token = token;
    }

    public get state(): AudioPlayerEvents {
        return this._state;
    }

    protected set state(state: AudioPlayerEvents) {
        this._state = state;
        this.emit('stateChanged', state);
    }

    protected async getStream(): Promise<Stream> {
        throw new Error('Not implemented');
    }

    public async updateToken(token: string): Promise<void> {
        this.token = token;
        await this.updateSession();
    }

    public get playingTrack(): Track | null {
        return this._playingTrack;
    }

    protected set playingTrack(track: Track | null) {
        this._playingTrack = track;
        this.emit('playingTrackChanged', track);
    }

    protected async updateSession() {
        throw new Error('Not implemented');
    }

    protected async playTrack($track: Track): Promise<void> {
        throw new Error('Not implemented');
    }

    protected async pauseTrack(): Promise<void> {
        throw new Error('Not implemented');
    }

    protected async resumeTrack(): Promise<void> {
        throw new Error('Not implemented');
    }

    protected async stopTrack(): Promise<void> {
        throw new Error('Not implemented');
    }

    protected async seekTrack($time: number): Promise<void> {
        throw new Error('Not implemented');
    }

    public async play(track: Track): Promise<void> {
        this._currentlyPlaying = track;
        this._currentTime = 0;
        this._duration = track.duration;
        this._isPlaying = true;
        this._isPaused = false;
        this._isStopped = false;
        this._queue = [];
        return this.playTrack(track);
    }

    public async pause(): Promise<void> {
        this._isPaused = true;
        return this.pauseTrack();
    }

    public async resume(): Promise<void> {
        this._isPaused = false;
        return this.resumeTrack();
    }

    public async stop(): Promise<void> {
        this._isStopped = true;
        return this.stopTrack();
    }

    public async seek(time: number): Promise<void> {
        this._currentTime = time;
        return this.seekTrack(time);
    }
}
