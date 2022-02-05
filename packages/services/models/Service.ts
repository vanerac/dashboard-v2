/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Service = {
    id?: number;
    type?: Service.type;
    enabled?: boolean;
};

export namespace Service {

    export enum type {
        GOOGLE = 'google',
        SPOTIFY = 'spotify',
        APPLE = 'apple',
        DEEZER = 'deezer',
        LASTFM = 'lastfm',
    }


}
