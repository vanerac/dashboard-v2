/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type getTrackResponse = {
    type?: getTrackResponse.type;
    id?: string;
    name?: string;
    artist?: string;
    album?: string;
    duration?: number;
    image?: string;
    provider?: string;
    playable?: boolean;
};

export namespace getTrackResponse {

    export enum type {
        ARTIST = 'artist',
        ALBUM = 'album',
        TRACK = 'track',
        PLAYLIST = 'playlist',
    }


}
