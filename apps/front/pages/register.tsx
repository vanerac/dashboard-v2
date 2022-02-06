import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';

const Register = () => {
    const router = useRouter();
    const testBool: boolean = true;
    const myErrorTest = "c'est pas ok";

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
                            error={testBool}
                            fullWidth
                            helperText={myErrorTest}
                            label="First Name"
                            margin="normal"
                            name="firstName"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Last Name"
                            margin="normal"
                            name="lastName"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Email Address"
                            margin="normal"
                            name="email"
                            type="email"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            margin="normal"
                            name="password"
                            // onBlur={}
                            type="password"
                            variant="outlined"
                        />
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                ml: -1,
                            }}></Box>
                        <Box sx={{ py: 2 }}>
                            <Button
                                color="primary"
                                // disabled={}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained">
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
        </>
    );
};

export default Register;
