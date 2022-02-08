import { AppProps } from 'next/app';
import withDarkMode from 'next-dark-mode';
import React from 'react';
import Theme from '../components/Themes';

const MyApp = (props: AppProps) => {
    const { Component, pageProps } = props;

    return (
        <Theme>
            <Component {...pageProps} />
        </Theme>
    );
};

const app = withDarkMode(MyApp);

export default app;
