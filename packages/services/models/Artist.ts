/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Artist = {
    type?: Artist.type;
    id?: string;
    name?: string;
    image?: string;
    provider?: string;
};

export namespace Artist {

    export enum type {
        ARTIST = 'artist',
        ALBUM = 'album',
        TRACK = 'track',
        PLAYLIST = 'playlist',
    }


}
