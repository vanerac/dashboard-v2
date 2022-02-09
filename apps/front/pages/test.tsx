import withAuth from './withAuth';

function test() {
    return <div>Example auth route</div>;
}

export default withAuth(test);
