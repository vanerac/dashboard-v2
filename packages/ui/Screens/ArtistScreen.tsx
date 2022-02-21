import {Artist} from "../../services";
import {Image, Text, View} from "react-native";

type ArtistScreenProps = {
    artist: Partial<Artist>;
};

export default function ArtistScreen(props: ArtistScreenProps) {
    return (
        <View>
            <Text>{props.artist.name}</Text>
            <Image source={{uri: props.artist.image}}/>
        </View>
    );
}
