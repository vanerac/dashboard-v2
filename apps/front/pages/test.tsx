import withAuth from './withAuth';
import SideBar from './../components/sideBar';

function test() {
    return (
        // <div>Example auth route</div>;
        <SideBar />
    );
}

export default withAuth(test);
