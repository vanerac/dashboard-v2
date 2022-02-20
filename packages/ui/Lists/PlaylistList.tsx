import {onClick} from "..";
import {Playlist} from "../../services";
import {Text, View} from "react-native";

type PlaylistListProps = {
    playlists: Playlist[];
    onClick: onClick
};

export default function PlaylistList(props: PlaylistListProps) {

    return (
        props.playlists.map((playlist: Playlist, index: number) => {
            return (
                <View key={index}>
                <PlaylistListItem playlist={playlist} onClick={props.onClick}/>
            </View>
        )
        })
    )
}


export function PlaylistListItem(props: {playlist: Playlist, onClick: onClick}) {

    /* Todo
     *  Add track
     *  Play playlist
     *  Save playlist
     */


    return (
        <View>
            <Text>{props.playlist.name}</Text>
        </View>
    )
}
