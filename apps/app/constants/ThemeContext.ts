import React from 'react';

export const themes = {
    light: {
        primary: '#FFFFFF',
        secondary: '#CCCCCC',
        accent: '#52A1FF',
        text: 'black',
    },
    dark: {
        primary: '#202020',
        secondary: '#313131',
        accent: '#52A1FF',
        text: 'white',
    },
};

export const ThemeContext = React.createContext({
    theme: themes.dark,
    toggleTheme: () => {},
});
