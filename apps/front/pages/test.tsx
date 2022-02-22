import withAuth from './withAuth';
// import Widgets from './../components/Widget';
import { SpinnerCircular } from 'spinners-react';

function test() {
    return <SpinnerCircular />;
}

export default withAuth(test);
