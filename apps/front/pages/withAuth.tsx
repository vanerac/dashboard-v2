import { useRouter } from 'next/router';

function withAuth(WrappedComponent: any) {
    return (props: any) => {
        if (typeof window !== 'undefined') {
            const Router = useRouter();

            // Todo: Note: This does not handle the case where the user is logged in but the token is expired.
            if (!localStorage.getItem('token')) {
                Router.push('/login');
            } else return <WrappedComponent {...props} />;
        }
        return null;
    };
}

export default withAuth;
