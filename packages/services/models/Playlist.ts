/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Track } from './Track';

export type Playlist = {
    id?: string;
    name?: string;
    description?: string;
    image?: string;
    provider?: string;
    tracks?: Array<Track>;
};
