import { AppProps as propApps } from 'next/app';
// import withDarkMode from 'next-dark-mode';
import React from 'react';
import Theme from '../components/Themes';

const MyApp = ({ Component, pageProps }: propApps) => {
    // const { Component, pageProps } = props;

    return (
        <Theme>
            <Component {...pageProps} />
        </Theme>
    );
};

// const app = withDarkMode(MyApp);

export default MyApp;
