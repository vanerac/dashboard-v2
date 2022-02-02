import withAuth from "./withAuth";

function test() {
    return <div>Salut test</div>;
}

export default withAuth(test);