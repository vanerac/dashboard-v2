/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Playlist = {
    id?: string;
    name?: string;
    description?: string;
    image?: string;
    provider?: string;
    tracks?: Array<{
        id?: string;
        name?: string;
        artist?: string;
        album?: string;
        duration?: number;
        image?: string;
        provider?: string;
    }>;
};
