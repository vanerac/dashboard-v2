import React from 'react';
import { UserMusicContext } from '../constants/UserMusicContext';

export const useUserMusic = () => {
    const { userMusic } = React.useContext(UserMusicContext);
    return { userMusic };
};
