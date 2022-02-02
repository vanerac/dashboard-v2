import { Button } from '@mui/material';
import { Brightness4 as DarkIcon, Brightness7 as LightIcon } from '@mui/icons-material';
import { useDarkMode } from 'next-dark-mode';
import Router from 'next/router';

const Home = () => {
    const { switchToDarkMode, switchToLightMode, darkModeActive } = useDarkMode();

    const handleChangeMode = () => {
        if (darkModeActive) {
            switchToLightMode();
        } else {
            switchToDarkMode();
        }
    };

    const handleClick = (e: any) => {
        Router.push('/login');
        console.log(e);
    };

    const nextMode = darkModeActive ? 'Light' : 'Dark';
    const Icon = darkModeActive ? LightIcon : DarkIcon;

    return (
        <>
                <p>Hello World!</p>
                <Button
                    onClick={handleChangeMode}
                    color="primary"
                    variant="contained"
                    startIcon={<Icon />}>
                    Use {nextMode} mode
                </Button>
                <br />
                <Button
                    color="primary"
                    variant="contained"
                    startIcon={<Icon />}
                    onClick={handleClick}>
                    Redirect to /login
                </Button>
        </>
    );
};

export default Home;
