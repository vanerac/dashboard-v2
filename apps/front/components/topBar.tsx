import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Cookies from 'universal-cookie';
import Router from 'next/router';
import { useDarkMode } from 'next-dark-mode';
import { Brightness4 as DarkIcon, Brightness7 as LightIcon } from '@mui/icons-material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import { Button, Grid, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import SvgIcon from '@mui/material/SvgIcon';
import { mdiRadioFm, mdiSpotify } from '@mdi/js';
import { getClient } from '../utils/ApiClient';
import { UrlObject } from 'url';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const handleInput = (value: any) => {
    console.log(value);
};

export default function SearchAppBar({ addWidget, connectedServices }) {
    const cookies = new Cookies();
    const { switchToDarkMode, switchToLightMode, darkModeActive } = useDarkMode();
    const nextMode = darkModeActive ? 'Light' : 'Dark';
    const Icon = darkModeActive ? LightIcon : DarkIcon;
    console.log(connectedServices);
    const spotifyService = connectedServices.find((service: { provider: string }) => service.provider === 'spotify');
    const googleService = connectedServices.find((service: { provider: string }) => service.provider === 'google');
    const appleService = connectedServices.find((service: { provider: string }) => service.provider === 'apple');
    const lastFMService = connectedServices.find((service: { provider: string }) => service.provider === 'lastFM');

    console.log('here => ', spotifyService);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
        getClient()
            .services.getAllUserServices()
            .then((data) => {
                console.log(data);
            });
    };
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const svgSpotify = (
        <SvgIcon>
            <path d={mdiSpotify} />
        </SvgIcon>
    );

    const svgLastFM = (
        <SvgIcon>
            <path d={mdiRadioFm} />
        </SvgIcon>
    );

    const authGoogle = () => {
        getClient()
            .sso.googleConsentSso('http://localhost:3000/sso/google')
            .then((data: { url: string | UrlObject }) => {
                console.log(data);
                Router.push(data.url);
            });
    };

    const authSpotify = () => {
        getClient()
            .sso.spotifyConsentSso('http://localhost:3000/sso/spotify')
            .then((data: { url: string | UrlObject }) => {
                console.log(data);
                Router.push(data.url);
            });
    };

    const authLastFM = () => {
        getClient()
            .sso.lastfmConsentSso('http://localhost:3000/getLastFMCode')
            .then((data: { url: string | UrlObject }) => {
                console.log(data);
                Router.push(data.url);
            });
    };

    const authApple = () => {
        // Client.sso.appleConsentSso('http://localhost:3000/getAppleCode').then((data) => {
        //     console.log(data);
        //     Router.push(data.url);
        // });
    };

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const handleChangeMode = () => {
        if (darkModeActive) {
            switchToLightMode();
        } else {
            switchToDarkMode();
        }
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, left: open });
    };

    const logout = () => {
        cookies.remove('API_TOKEN', { path: '/' });
        Router.push('/login');
    };

    const list = (anchor: string) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}>
            {/* <List>
                {['Profile', 'Settings', 'Services', 'Widgets'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List> */}
            <ListItem onClick={handleOpen} button key={'Profile'}>
                <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                <ListItemText primary={'Profile'} />
            </ListItem>
            <ListItem onClick={handleOpen} button key={'Settings'}>
                <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                <ListItemText primary={'Settings'} />
            </ListItem>
            <ListItem onClick={handleOpen} button key={'Services'}>
                <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                <ListItemText primary={'Services'} />
            </ListItem>
            <ListItem onClick={handleOpen} button key={'Widgets'}>
                <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                <ListItemText primary={'Widgets'} />
            </ListItem>
            <Divider />
            <List>
                <ListItem onClick={logout} button key={'logout'}>
                    <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                    <ListItemText primary={'Logout'} />
                </ListItem>
                <ListItem onClick={addWidget} button key={'add_widget'}>
                    <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                    <ListItemText primary={'Add Widget'} />
                </ListItem>
                <ListItem onClick={handleChangeMode} button key={'darkode'}>
                    <ListItemIcon>{<Icon />}</ListItemIcon>
                    <ListItemText primary={'Use ' + nextMode + 'Mode'} />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            onClick={toggleDrawer('left', true)}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                            Music Dashboard
                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                onChange={(event) => handleInput(event.target.value)}
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Toolbar>
                </AppBar>
            </Box>
            {/* {['left', 'right', 'top', 'bottom'].map((anchor) => ( */}
            <React.Fragment>
                <Drawer anchor="left" open={state['left']} onClose={toggleDrawer('left', false)}>
                    {list('left')}
                </Drawer>
            </React.Fragment>
            {/* ))} */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                            style={{ marginBottom: '10%' }}>
                            Choose a service to connect :
                        </Typography>
                        {/* <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            ca arraive mon reuf
                        </Typography> */}
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Button
                                    disabled={lastFMService}
                                    color="info"
                                    fullWidth
                                    startIcon={svgLastFM}
                                    onClick={authLastFM}
                                    size="large"
                                    variant="contained">
                                    LastFM
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button
                                    disabled={googleService}
                                    fullWidth
                                    color="error"
                                    startIcon={<GoogleIcon />}
                                    onClick={authGoogle}
                                    size="large"
                                    variant="contained">
                                    Google
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button
                                    disabled={spotifyService}
                                    fullWidth
                                    color="secondary"
                                    startIcon={svgSpotify}
                                    onClick={authSpotify}
                                    size="large"
                                    variant="contained">
                                    Spotify
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button
                                    disabled={appleService}
                                    fullWidth
                                    color="primary"
                                    startIcon={<AppleIcon />}
                                    onClick={authApple}
                                    size="large"
                                    variant="contained">
                                    Apple
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}
