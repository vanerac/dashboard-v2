import {onClick} from "..";
import {Artist} from "../../services";
import {Image, Text, View} from "react-native";
import {Client} from "../../global";

type ArtistListProps = {
    artists: Artist[];
    onClick: onClick
};

export default function ArtistList(props: ArtistListProps) {

    return (
        props.artists.map((artist: Artist, index: number) => {
            return (
                <View key={index}>
                <ArtistListItem artist={artist} onClick={props.onClick}/>
            </View>
        )
        })
    )
}


export function ArtistListItem(props: {artist: Artist, onClick: onClick}) {
    /*TODO
    *  Name
    *  Count
    *  Image
    *   follow artist
    *   unfollow artist
    *   Suffle
     */


    const follow = (artist: Artist) => {
        Client.artist.followArtist(service.id, artist.id)
    }

    const unfollow = (artist: Artist) => {
        Client.artist.unfollowArtist(service.id, artist.id)
    }

    const shuffle = (artist: Artist) => {
        Client.playback.playArtist(service.id, artist.id)
    }


    return (
        <View>
            <Text>{props.artist.name}</Text>
            <Image source={{uri: props.artist.image}}/>
            <Text>{props.artist.followers}</Text>

        </View>
    )
}
