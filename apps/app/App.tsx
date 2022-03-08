import React, { useCallback, useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { ThemeContext, themes } from './constants/ThemeContext';
import { UserMusicContext } from './constants/UserMusicContext';
import { Playlist } from '../../packages/services';

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    const [$currentTheme, setCurrentTheme] = useState(themes.dark);
    const [userMusic, setUserMusic] = useState<Playlist>();
    const toggleTheme = useCallback(() => {
        setCurrentTheme((theme) => (theme === themes.light ? themes.dark : themes.light));
    }, [themes.light, themes.dark]);

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <ThemeContext.Provider value={{ theme: themes.dark, toggleTheme }}>
                <UserMusicContext.Provider value={{ userMusic, setUserMusic }}>
                    <SafeAreaProvider>
                        <Navigation colorScheme={colorScheme} />
                        <StatusBar />
                    </SafeAreaProvider>
                </UserMusicContext.Provider>
            </ThemeContext.Provider>
        );
    }
}
