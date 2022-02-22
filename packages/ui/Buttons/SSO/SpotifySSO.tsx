import {Client} from '../../../global'
import React from 'react'
// import {mdiSpotify} from "@mdi/js";
import {Text, TouchableOpacity} from 'react-native'
// import SvgIcon from "@mui/material/SvgIcon";


export type SSOButtonProps = {
    callbackURL: string // Callback URL to receive code, optional (recommended)
    // Todo: this becomes an onClick event
    onClick: (args: { url: string }) => void // Redirect when you get code

}
//
// const svgSpotify = ( <SvgIcon>
//   <path d={mdiSpotify} />
// </SvgIcon>)

export default function SpotifySSO({callbackURL, onClick}: SSOButtonProps) {

    const authSpotify = () => {
        Client.sso.spotifyConsentSso(callbackURL).then(onClick);
    };

    // return <Button
    // fullWidth
    //     color="secondary"
    //     startIcon={svgSpotify}
    //     onClick={authSpotify}
    //     size="large"
    //     variant="contained">
    //     Login with Spotify
    // </Button>


    return (<TouchableOpacity onPress={authSpotify} style={{backgroundColor: 'blue'}} >
        <Text>Login with Spotify</Text>
    </TouchableOpacity>)
}
