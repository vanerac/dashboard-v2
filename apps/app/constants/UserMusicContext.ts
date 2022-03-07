import React from 'react';
// import { Playlist } from '../../../packages/services';

export const music = {
    playlist: {
        id: String,
        provider: String,
    },
};

export const MusicContext = React.createContext({
    Playlist: music.playlist,
    setPlaylist: () => {},
});
