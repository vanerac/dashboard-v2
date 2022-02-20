import {onClick} from "..";
import {Playlist, Track} from "../../services";
import {Text, View} from "react-native";
import {Client} from "../../global";

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


    const addTrack = (track: Track, playlist: Playlist) => {
        Client.playlist.addToPlaylist(track.id, service.id, playlist.id);
    };

    const playPlaylist = (playlist: Playlist) => {
        Client.playlist.playPlaylist(playlist); // todo
    };

    const savePlaylist = (playlist: Playlist) => {
        Client.playlist.savePlaylist(playlist); // todo
    };

    const unsavePlaylist = (playlist: Playlist) => {
        Client.playlist.unsavePlaylist(playlist); //todo
    };

    return (
        <View>
            <Text>{props.playlist.name}</Text>
        </View>
    )
}
