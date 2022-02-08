/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Track } from './Track';

export type PlaybackStateResponse = {
    state?: PlaybackStateResponse.state;
    position?: number;
    duration?: number;
    volume?: number;
    track?: Track;
};

export namespace PlaybackStateResponse {

    export enum state {
        PLAYING = 'playing',
        PAUSED = 'paused',
        STOPPED = 'stopped',
    }


}
