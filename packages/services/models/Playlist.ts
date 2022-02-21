/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Track } from './Track';

export type Playlist = {
    type?: Playlist.type;
    id: string;
    name: string;
    description?: string;
    image?: string;
    provider: string;
    tracks?: Array<Track>;
};

export namespace Playlist {

    export enum type {
        ARTIST = 'artist',
        ALBUM = 'album',
        TRACK = 'track',
        PLAYLIST = 'playlist',
    }


}
