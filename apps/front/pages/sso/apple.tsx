// import { Client, updateClientConfig } from '../../../../packages/global';
import { SpinnerCircular } from 'spinners-react';
// import Cookies from 'universal-cookie';

// const cookies = new Cookies();

function ssoApple() {
    // if (typeof window !== 'undefined') {
    // let params = new URL(window.location.href).searchParams;
    // let code = params.get('code');
    // COMING SOON
    // Client.sso.appleAuthCodeSso(code, '').then((data) => {
    //     const { token } = data;
    //     cookies.set('API_TOKEN', token, { expires: new Date(Date.now() + 1000 * 3600), path: '/' });
    //     updateClientConfig({
    //         TOKEN: token,
    //     });
    //     Router.push('/');
    // });
    // }
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

export default ssoApple;
