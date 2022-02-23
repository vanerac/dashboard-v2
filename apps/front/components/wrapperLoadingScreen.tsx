function loadingScreen(WrappedComponent: any) {
    return (props: any) => {
        if (typeof window !== 'undefined') {
            //   const accessToken = localStorage.getItem("accessToken");
            // const accessToken = 'ok';

            // if (!cookies.get('API_TOKEN')) {
            //     Router.replace('/login');
            //     return null;
            // }
            return <WrappedComponent {...props} />;
        }
        return null;
    };
}

export default loadingScreen;
