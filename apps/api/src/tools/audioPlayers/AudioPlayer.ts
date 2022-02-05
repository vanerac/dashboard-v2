import { EventEmitter } from 'events';
import { Track } from './playerManager.tools';

export type AudioPlayerEvents = 'playing' | 'pause' | 'seek' | 'stopped' | 'error';

export abstract class AudioPlayer extends EventEmitter {
    static readonly DEFAULT_VOLUME = 1;
    static readonly DEFAULT_LOOP = false;

    protected _state: AudioPlayerEvents = 'stopped';
    protected _playingTrack: Track | null = null;

    protected _isPlaying: boolean | undefined;
    protected _isPaused: boolean | undefined;
    protected _isStopped: boolean | undefined;
    protected _currentlyPlaying: Track | undefined;
    protected _currentTime: number | undefined;
    protected _duration: number | undefined;
    protected _queue: Track[] | undefined;

    protected constructor() {
        super();
    }

    public get state(): AudioPlayerEvents {
        return this._state;
    }

    protected set state(state: AudioPlayerEvents) {
        this._state = state;
        this.emit('stateChanged', state);
    }

    public get playingTrack(): Track | null {
        return this._playingTrack;
    }

    protected set playingTrack(track: Track | null) {
        this._playingTrack = track;
        this.emit('playingTrackChanged', track);
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
}
