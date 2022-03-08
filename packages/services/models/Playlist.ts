/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Track } from './Track';

export type Playlist = {
    type?: 'artist' | 'album' | 'track' | 'playlist';
    id: string;
    name: string;
    description?: string;
    image?: string;
    provider: string;
    tracks?: Array<Track>;
};
