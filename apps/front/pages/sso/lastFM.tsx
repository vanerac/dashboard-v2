import { SpinnerCircular } from 'spinners-react';
import Cookies from 'universal-cookie';
import Router from 'next/router';
import { getClient } from '../../utils/ApiClient';
import loadingScreen from '../../components/wrapperLoadingScreen';
import { useEffect } from 'react';

const cookies = new Cookies();

function SsoLastfm() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            let params = new URL(window.location.href).searchParams;
            let token = params.get('token');
            getClient()
                .sso.lastfmAuthCodeSso(token, false)
                .then((data) => {
                    const { token: api_token } = data;
                    cookies.set('API_TOKEN', api_token, { expires: new Date(Date.now() + 1000 * 3600), path: '/' });
                    Router.push('/');
                });
        }
    });

    return (
        <>
            <SpinnerCircular
                size={90}
                thickness={98}
                speed={100}
                color="#36ad47"
                secondaryColor="rgba(0, 0, 0, 0.44)"
                style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            />
        </>
    );
}

export default loadingScreen(SsoLastfm);
