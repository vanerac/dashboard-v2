import withAuth from "./withAuth";
import TopBar from './../components/topBar'

const Dasboard = () => {
    return(
        <TopBar />
        // <>Welcome to your dasboard</>;
    )
};

export default withAuth(Dasboard);
