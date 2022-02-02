import { CacheProvider } from '@emotion/react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useDarkMode } from 'next-dark-mode';
import React, { ReactNode, useMemo } from 'react';
import { darkTheme, lightTheme } from './_themes';
import createCache from '@emotion/cache';
import type { EmotionCache } from '@emotion/cache';

let muiCache: EmotionCache | undefined = undefined;

export const createMuiCache = () =>
    createCache({
        key: 'mui',
        prepend: true,
    });

interface Props {
    children: ReactNode;
}

const Theme = (props: Props) => {
    const { children } = props;

    const { darkModeActive } = useDarkMode();

    const activeTheme = useMemo(() => {
        const colorTheme = darkModeActive ? darkTheme : lightTheme;

        const generatedTheme = createTheme(colorTheme);

        return generatedTheme;
    }, [darkModeActive]);

    return (
        <CacheProvider value={muiCache || createMuiCache()}>
            <ThemeProvider theme={activeTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </CacheProvider>
    );
};

export default Theme;
