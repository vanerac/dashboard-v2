import {Playlist} from "../../services";
import React, {useEffect, useState} from 'react'
import {View} from "react-native";
import {Client} from "../../utils";
import {onClick, ServiceProvider} from "../index";

type PlaylistFetchProps = {
    id: string;
    provider: ServiceProvider;
}

type PlaylistProps = {
    playlist: Playlist;
    onClick: onClick;
}

export function PlaylistCardFetch(props: PlaylistFetchProps & { onClick: onClick}) {
    const [Playlist, setPlaylist] = useState<Playlist>();

    useEffect(() => {
        Client.playlist.getPlaylistById(props.id, props.provider).then((val )=>setPlaylist(val.playlist));
    }, [props.id, props.provider]);

    if (!Playlist) {
        return <View/>;
    }
    return PlaylistCard({...props, playlist: Playlist});
}


export default function PlaylistCard(props: PlaylistProps) {
    // use React native syntax

    return (
        <View>
            <View/>
        </View>
    );
}
