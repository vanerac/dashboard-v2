/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Track } from './Track';

export type PlaybackStatus = {
    track: Track;
    position: number;
    device: string;
    state: 'playing' | 'paused' | 'stopped';
};
