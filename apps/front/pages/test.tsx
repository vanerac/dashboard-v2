import withAuth from './withAuth';
// import Widgets from './../components/Widget';
import Child from './../components/test_bis';

function test() {
    const sendDataToParent = (str) => {
        console.log(str);
        // setDrive(index);
    };
    return (
        <Child sendDataToParent={sendDataToParent} />
        // <div>Example auth route</div>;
        // <ShowcaseLayout />
        // <Widgets />
    );
}

export default withAuth(test);
