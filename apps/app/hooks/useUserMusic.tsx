import React from 'react';
import { UserServicesContext } from '../constants/UserServicesContext';

export const useUserPlaylist = () => {
    const { userServices } = React.useContext(UserServicesContext);
    return { userServices };
};
