import { useRouter } from 'next/router';

function withAuth (WrappedComponent: any) {
    return (props: any) => {
        if (typeof window !== 'undefined') {
            const Router = useRouter();
            //   const accessToken = localStorage.getItem("accessToken");
            const accessToken = 'ok';

            if (accessToken != 'ok') {
                Router.replace('/');
                return null;
            }
            return <WrappedComponent {...props} />;
        }
        return null;
    };
};

export default withAuth;
