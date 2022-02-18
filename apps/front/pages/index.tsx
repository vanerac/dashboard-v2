import { Brightness4 as DarkIcon, Brightness7 as LightIcon } from '@mui/icons-material';
import { useDarkMode } from 'next-dark-mode';
import withAuth from './withAuth';
// import Head from 'next/head';
import NextLink from 'next/link';
import { Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import SvgIcon from '@mui/material/SvgIcon';
import { mdiRadioFm, mdiSpotify } from '@mdi/js';
import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// import { Test } from '@area/ui';
import { Client, updateClientConfig } from '../../../packages/global';

const Home = () => {
    const { switchToDarkMode, switchToLightMode, darkModeActive } = useDarkMode();
    let errorBool: boolean = false;
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errorEmptyFieldEmail, setErrorEmptyFieldEmail] = useState('');
    const [errorEmptyFieldPassword, setErrorEmptyFieldPassword] = useState('');
    const errorString = 'This input field cannot be empty.';

    const handleChangeMode = () => {
        if (darkModeActive) {
            switchToLightMode();
        } else {
            switchToDarkMode();
        }
    };

    const nextMode = darkModeActive ? 'Light' : 'Dark';
    const Icon = darkModeActive ? LightIcon : DarkIcon;

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

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const updatePassword = (event: any) => {
        setErrorEmptyFieldPassword('');
        setUserPassword(event.target.value);
    };
    // const redirectLogin = ($e: any) => {
    //     Router.push('/login');
    // };

    // const redirectRegister = ($e: any) => {
    //     Router.push('/register');
    // };

    const updateEmail = (event: any) => {
        setErrorEmptyFieldEmail('');
        setUserEmail(event.target.value);
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

    const submit = () => {
        if (userPassword === '') {
            errorBool = true;
            setErrorEmptyFieldPassword(errorString);
        } else setErrorEmptyFieldPassword('');

        if (userEmail === '') {
            errorBool = true;
            setErrorEmptyFieldEmail(errorString);
        } else setErrorEmptyFieldEmail('');

        console.log(errorBool);

        if (errorBool === false) {
            Client.authentication
                .login({
                    email: userEmail,
                    password: userPassword,
                })
                .then((data) => {
                    updateClientConfig({
                        TOKEN: data.token,
                    });
                    localStorage.setItem('token', data.token);
                    // Todo: Redirect to home & store expiration date?
                })
                // Todo: Handle 401: Token expired
                .catch(handleOpen);
        }
    };

    // return <Test />;
    return (
        <>
            <Button onClick={handleChangeMode} color="primary" variant="contained" startIcon={<Icon />}>
                Use {nextMode} mode
            </Button>
            <br />
            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100%',
                }}>
                <Container maxWidth="sm">
                    <form>
                        <Box sx={{ my: 3 }}>
                            <Typography color="textPrimary" variant="h4">
                                Sign in
                            </Typography>
                            <Typography color="textSecondary" gutterBottom variant="body2">
                                Sign in on the Music Dashboard
                            </Typography>
                        </Box>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Button
                                    color="info"
                                    fullWidth
                                    startIcon={svgLastFM}
                                    //   onClick={}
                                    size="large"
                                    variant="contained">
                                    Login with LastFM
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button
                                    fullWidth
                                    color="error"
                                    startIcon={<GoogleIcon />}
                                    //   onClick={}
                                    size="large"
                                    variant="contained">
                                    Login with Google
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button
                                    fullWidth
                                    color="secondary"
                                    startIcon={svgSpotify}
                                    //   onClick={}
                                    size="large"
                                    variant="contained">
                                    Login with Spotify
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button
                                    fullWidth
                                    color="primary"
                                    startIcon={<AppleIcon />}
                                    //   onClick={}
                                    size="large"
                                    variant="contained">
                                    Login with Apple
                                </Button>
                            </Grid>
                        </Grid>
                        <Box
                            sx={{
                                pb: 1,
                                pt: 3,
                            }}>
                            <Typography align="center" color="textSecondary" variant="body1">
                                or login with email address
                            </Typography>
                        </Box>
                        <TextField
                            fullWidth
                            error={errorEmptyFieldEmail !== ''}
                            helperText={errorEmptyFieldEmail}
                            label="Email Address"
                            margin="normal"
                            name="email"
                            type="email"
                            onChange={(evt) => updateEmail(evt)}
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            error={errorEmptyFieldPassword !== ''}
                            helperText={errorEmptyFieldPassword}
                            // onBlur={test}
                            label="Password"
                            margin="normal"
                            name="password"
                            type="password"
                            onChange={(evt) => updatePassword(evt)}
                            variant="outlined"
                        />
                        <Box sx={{ py: 2 }}>
                            <Button
                                color="primary"
                                // disabled={}
                                fullWidth
                                size="large"
                                onClick={submit}
                                // type="submit"
                                variant="contained">
                                Sign In Now
                            </Button>
                        </Box>
                        <Typography color="textSecondary" variant="body2">
                            Don&apos;t have an account?{' '}
                            <NextLink href="/register" passHref>
                                <Link variant="subtitle2" underline="hover">
                                    Sign Up
                                </Link>
                            </NextLink>
                        </Typography>
                    </form>
                </Container>
            </Box>
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
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            An error has occurred.
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            Please try again.
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default withAuth(Home);
