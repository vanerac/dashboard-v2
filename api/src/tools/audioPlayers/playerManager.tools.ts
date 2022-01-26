export interface Track {
    provider: string;
    id: string;
    title: string;
    artist: string;
    album: string;
    duration: number;
    cover: string;
    url: string;
}

export class AudioPlayer {
    static readonly DEFAULT_VOLUME = 1;
    static readonly DEFAULT_LOOP = false;

    protected _volume: number;
    protected _loop: boolean;
    protected _isPlaying: boolean;
    protected _isPaused: boolean;
    protected _isStopped: boolean;
    protected _currentlyPlaying: Track;
    protected _currentTime: number;
    protected _duration: number;
    protected _queue: Track[];

    play(track: Track): void {
        this._currentlyPlaying = track;
        this._currentTime = 0;
        this._duration = track.duration;
        this._isPlaying = true;
        this._isPaused = false;
        this._isStopped = false;
        this._queue = [];
        this.playTrack(track);
    }

    protected playTrack($track: Track): void {
        throw new Error('Not implemented');
    }

    pause(): void {
        this._isPaused = true;
        this.pauseTrack();
    }

    protected pauseTrack(): void {
        throw new Error('Not implemented');
    }

    resume(): void {
        this._isPaused = false;
        this.resumeTrack();
    }

    protected resumeTrack(): void {
        throw new Error('Not implemented');
    }

    stop(): void {
        this._isStopped = true;
        this.stopTrack();
    }

    protected stopTrack(): void {
        throw new Error('Not implemented');
    }

    seek(time: number): void {
        this._currentTime = time;
        this.seekTrack(time);
    }

    protected seekTrack($time: number): void {
        throw new Error('Not implemented');
    }
}

export default class PlayerManager {
    /* Notes:
     * The playermanger is responsible for managing the audio players.
     * It is responsible for creating, destroying, and updating the audio players.
     */
    constructor() {
        // Todo Set audio context
    }
}
