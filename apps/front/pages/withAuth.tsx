import { useRouter } from 'next/router';
import { OpenAPI } from '../../../packages/services';

function withAuth(WrappedComponent: any) {
    return (props: any) => {
        if (typeof window !== 'undefined') {
            const Router = useRouter();

            console.log('here => ', OpenAPI.TOKEN);
            //   const accessToken = localStorage.getItem("accessToken");
            // const accessToken = 'ok';

            if (!OpenAPI.TOKEN) {
                Router.replace('/');
                return null;
            }
            return <WrappedComponent {...props} />;
        }
        return null;
    };
}

export default withAuth;
