/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type getTrackAlbumResponse = {
    type?: getTrackAlbumResponse.type;
    id?: string;
    name?: string;
    artist?: string;
    image?: string;
    provider?: string;
};

export namespace getTrackAlbumResponse {

    export enum type {
        ARTIST = 'artist',
        ALBUM = 'album',
        TRACK = 'track',
        PLAYLIST = 'playlist',
    }


}
