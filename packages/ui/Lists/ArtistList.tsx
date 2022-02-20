import {onClick} from "..";
import {Artist} from "../../services";
import {Image, Text, View} from "react-native";

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
     */
    return (
        <View>
            <Text>{props.artist.name}</Text>
            <Image source={{uri: props.artist.image}}/>
            <Text>{props.artist.followers}</Text>

        </View>
    )
}
