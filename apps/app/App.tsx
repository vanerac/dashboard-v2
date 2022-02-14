import React, { useCallback, useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { ThemeContext, themes } from './constants/ThemeContext';

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    const [$currentTheme, setCurrentTheme] = useState(themes.dark);
    const toggleTheme = useCallback(() => {
        setCurrentTheme((theme) => (theme === themes.light ? themes.dark : themes.light));
    }, [themes.light, themes.dark]);

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <ThemeContext.Provider value={{ theme: themes.dark, toggleTheme }}>
                <SafeAreaProvider>
                    <Navigation colorScheme={colorScheme} />
                    <StatusBar />
                </SafeAreaProvider>
            </ThemeContext.Provider>
        );
    }
}
