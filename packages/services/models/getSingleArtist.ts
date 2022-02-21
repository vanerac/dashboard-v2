/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type getSingleArtist = {
    type?: getSingleArtist.type;
    id: string;
    name: string;
    image: string;
    provider: string;
    followers: number;
    external_urls: string;
};

export namespace getSingleArtist {

    export enum type {
        ARTIST = 'artist',
        ALBUM = 'album',
        TRACK = 'track',
        PLAYLIST = 'playlist',
    }


}
