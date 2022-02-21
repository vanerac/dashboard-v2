// import Head from 'next/head';
import NextLink from 'next/link';
// import { useRouter } from 'next/router';
import { Button, Container, Link, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Client } from '../../../packages/global';
import Router from 'next/router';

const Register = () => {
    let errorBool: boolean = false;
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userDisplayName, setUserDisplayName] = useState('');
    const errorString = 'This input field cannot be empty.';

    const [errorEmptyFieldDisplayName, setErrorEmptyFieldDisplayName] = useState('');
    const [errorEmptyFieldEmail, setErrorEmptyFieldEmail] = useState('');
    const [errorEmptyFieldPassword, setErrorEmptyFieldPassword] = useState('');

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

    const updateEmail = (event: any) => {
        setErrorEmptyFieldEmail('');
        setUserEmail(event.target.value);
    };

    const updatePassword = (event: any) => {
        setErrorEmptyFieldPassword('');
        setUserPassword(event.target.value);
    };

    const updateDisplayName = (event: any) => {
        setErrorEmptyFieldDisplayName('');
        setUserDisplayName(event.target.value);
    };

    const submit = () => {
        if (userEmail === '') {
            errorBool = true;
            setErrorEmptyFieldEmail(errorString);
        } else setErrorEmptyFieldEmail('');

        if (userPassword === '') {
            errorBool = true;
            setErrorEmptyFieldPassword(errorString);
        } else setErrorEmptyFieldPassword('');

        if (userDisplayName === '') {
            errorBool = true;
            setErrorEmptyFieldDisplayName(errorString);
        } else setErrorEmptyFieldDisplayName('');

        if (errorBool === false) {
            Client.authentication
                .register({
                    email: userEmail,
                    password: userPassword,
                    displayName: userDisplayName,
                })
                .then((data) => {
                    console.log(data);
                    console.log('submitting');
                    Router.push('/login');
                })
                .catch(handleOpen);
        }
    };

    return (
        <>
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
                                Create a new account
                            </Typography>
                            <Typography color="textSecondary" gutterBottom variant="body2">
                                Use your email to create a new account
                            </Typography>
                        </Box>
                        <TextField
                            fullWidth
                            error={errorEmptyFieldDisplayName !== ''}
                            helperText={errorEmptyFieldDisplayName}
                            label="Display Name"
                            margin="normal"
                            name="displayName"
                            variant="outlined"
                            onChange={(evt) => updateDisplayName(evt)}
                        />
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
                            label="Password"
                            margin="normal"
                            name="password"
                            type="password"
                            onChange={(evt) => updatePassword(evt)}
                            variant="outlined"
                        />
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                ml: -1,
                            }}></Box>
                        <Box sx={{ py: 2 }}>
                            <Button color="primary" fullWidth size="large" onClick={submit} variant="contained">
                                Sign Up Now
                            </Button>
                        </Box>
                        <Typography color="textSecondary" variant="body2">
                            Have an account?{' '}
                            <NextLink href="/login" passHref>
                                <Link variant="subtitle2" underline="hover">
                                    Sign In
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

export default Register;
