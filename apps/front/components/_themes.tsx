import { ThemeOptions } from '@mui/material';
import { lightBlue, orange } from '@mui/material/colors';

export const lightTheme: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: lightBlue[400],
        },
        secondary: {
            main: orange[400],
        },
    },
};

export const darkTheme: ThemeOptions = {
    palette: {
        background: {
            default: '#303030',
            paper: '#424242',
        },
        mode: 'dark',
        primary: {
            main: lightBlue[800],
        },
        secondary: {
            main: orange[800],
        },
    },
};