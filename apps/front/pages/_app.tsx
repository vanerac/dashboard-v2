import { AppProps as propApps } from 'next/app';
import withDarkMode from 'next-dark-mode';
import React from 'react';
import Theme from '../components/Themes';
import ReactDOM from 'react-dom';

const MyApp = ({ Component, pageProps }: propApps) => {
    // const { Component, pageProps } = props;

    return (
        <Theme>
            <Component {...pageProps} />
        </Theme>
    );
};

// const app = withDarkMode(MyApp);

export default withDarkMode(MyApp);

// const contentDiv = document.getElementById('root');
// //@ts-ignore
// const gridProps = window.gridProps || {};

// if (typeof window !== 'undefined') {
//     ReactDOM.render(React.createElement(MyApp, gridProps), contentDiv);
// }
