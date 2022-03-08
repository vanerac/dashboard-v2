/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Track = {
    type: 'artist' | 'album' | 'track' | 'playlist';
    id: string;
    name: string;
    artist: string;
    album: string;
    duration: number;
    image: string;
    provider: string;
    playable: boolean;
    uri: string;
};
