import { Client, updateClientConfig } from '../../../../packages/global';
import { SpinnerCircular } from 'spinners-react';
import Cookies from 'universal-cookie';
import Router from 'next/router';

const cookies = new Cookies();

function getGoogleCode() {
    if (typeof window !== 'undefined') {
        let params = new URL(window.location.href).searchParams;
        let code = params.get('code');
        Client.sso.googleAuthCodeSso(code, 'http://localhost:3000/sso/google').then((data) => {
            const { token } = data;
            cookies.set('API_TOKEN', token, { expires: new Date(Date.now() + 1000 * 3600), path: '/' });
            updateClientConfig({
                TOKEN: token,
            });
            Router.push('/');
        });
    }
    return (
        <>
            <SpinnerCircular />
        </>
    );
}

export default getGoogleCode;
