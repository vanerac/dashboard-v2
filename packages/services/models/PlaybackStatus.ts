/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Track } from './Track';

export type PlaybackStatus = {
    track?: Track;
    position?: number;
    device?: string;
    state?: PlaybackStatus.state;
};

export namespace PlaybackStatus {

    export enum state {
        PLAYING = 'playing',
        PAUSED = 'paused',
        STOPPED = 'stopped',
    }


}
