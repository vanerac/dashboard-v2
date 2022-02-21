import { Client } from '../../../../packages/global';
import { SpinnerCircular } from 'spinners-react';

function ssoSpotify() {
    if (typeof window !== 'undefined') {
        let params = new URL(window.location.href).searchParams;
        let code = params.get('code');
        console.log('CODE => ', code);

        // TODO: Add state validation ?
        Client.sso.spotifyAuthCodeSso(code).then((data) => {
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

export default ssoSpotify;
