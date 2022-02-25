/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Track } from './Track';

export type PlaybackStateResponse = {
    state?: 'playing' | 'paused' | 'stopped';
    position?: number;
    duration?: number;
    volume?: number;
    track?: Track;
};
