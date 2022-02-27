function loadingScreen(WrappedComponent: any) {
    return (props: any) => {
        if (typeof window !== 'undefined') return <WrappedComponent {...props} />;
        return null;
    };
}

export default loadingScreen;
