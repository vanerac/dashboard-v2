import React from 'react';

export const themes = {
    light: {
        primary: '#FFFFFF',
        secondary: '#CCCCCC',
        accent: '#52A1FF',
        text: '#000000',
        textPlaceholder: '#E6E6E6',
    },
    dark: {
        primary: '#202020',
        secondary: '#313131',
        accent: '#52A1FF',
        text: '#FFFFFF',
        textPlaceholder: '#666666',
    },
};

export const ThemeContext = React.createContext({
    theme: themes.dark,
    toggleTheme: () => {},
});
