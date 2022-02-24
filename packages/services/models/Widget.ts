/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Widget = {
    id: string;
    serviceId: string;
    'x': number;
    'y': number;
    width: number;
    height: number;
    type: Widget.type;
    data: string;
    createdAt: string;
    editedAt: string;
};

export namespace Widget {

    export enum type {
        STAT = 'stat',
        ALBUM = 'album',
        PLAYLIST = 'playlist',
        ARTIST = 'artist',
        SEARCH = 'search',
    }


}
