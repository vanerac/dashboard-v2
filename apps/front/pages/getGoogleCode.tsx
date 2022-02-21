import { Client } from '../../../packages/global';
import Router from 'next/router';
import { SpinnerCircular } from 'spinners-react';

function getGoogleCode() {
    if (typeof window !== 'undefined') {
        let params = new URL(window.location.href).searchParams;
        let code = params.get('code');
        console.log('CODE => ', code);
        Client.sso.googleAuthCodeSso(code).then((data) => {
            console.log(data);
            // Router.push(data.url);
        });
    }
    return (
        <>
            <SpinnerCircular />
        </>
    );
}

export default getGoogleCode;
