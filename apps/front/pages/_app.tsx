import { AppProps as propApps } from 'next/app';
// import withDarkMode from 'next-dark-mode';
import React, { useEffect } from 'react';
import Theme from '../components/Themes';
import '../../../packages/global';
import { updateClientConfig } from '../../../packages/global'; // Load Global dependencies

const MyApp = ({ Component, pageProps }: propApps) => {
    // const { Component, pageProps } = props;

    // If token in localstorage, update client

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            // Todo: Check expiration date
            updateClientConfig({
                TOKEN: token,
            });
        }
    });

    return (
        <Theme>
            <Component {...pageProps} />
        </Theme>
    );
};

// const app = withDarkMode(MyApp);

export default MyApp;
