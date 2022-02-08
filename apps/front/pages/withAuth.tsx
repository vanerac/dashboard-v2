import { useRouter } from 'next/router';
import { OpenAPI } from '../../../packages/services';
import Cookies from 'universal-cookie';

function withAuth(WrappedComponent: any) {
    const cookies = new Cookies();

    return (props: any) => {
        if (typeof window !== 'undefined') {
            const Router = useRouter();
            //   const accessToken = localStorage.getItem("accessToken");
            // const accessToken = 'ok';

            if (!cookies.get('API_TOKEN')) {
                Router.replace('/');
                return null;
            }
            return <WrappedComponent {...props} />;
        }
        return null;
    };
}

export default withAuth;
