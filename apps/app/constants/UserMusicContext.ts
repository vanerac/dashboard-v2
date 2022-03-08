import React from 'react';
import { Playlist } from '../../../packages/services';

type UserMusicContextValue = {
    userMusic?: Playlist;
    setUserMusic: ($services: Playlist | undefined) => void;
};

export const UserMusicContext = React.createContext<UserMusicContextValue>({
    userMusic: undefined,
    setUserMusic: () => {},
});
