import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import SvgIcon from '@mui/material/SvgIcon';
import { mdiSpotify } from '@mdi/js';
import { mdiRadioFm } from '@mdi/js';

const Login = () => {
    const router = useRouter();

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
                            label="Email Address"
                            margin="normal"
                            name="email"
                            //   onBlur={formik.handleBlur}
                            type="email"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            margin="normal"
                            name="password"
                            //   onBlur={formik.handleBlur}
                            type="password"
                            variant="outlined"
                        />
                        <Box sx={{ py: 2 }}>
                            <Button
                                color="primary"
                                // disabled={}
                                fullWidth
                                size="large"
                                type="submit"
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
        </>
    );
};

export default Login;
