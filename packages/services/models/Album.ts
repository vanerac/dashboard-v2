/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Album = {
    type?: Album.type;
    id?: string;
    name?: string;
    artist?: string;
    image?: string;
    provider?: string;
};

export namespace Album {

    export enum type {
        ARTIST = 'artist',
        ALBUM = 'album',
        TRACK = 'track',
        PLAYLIST = 'playlist',
    }


}
