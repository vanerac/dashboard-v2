import {Track} from "../../services";
import React, {useEffect, useState} from 'react'
import {View} from "react-native";
import {Client} from "../../global";
import {ServiceProvider} from "../index";

type TrackFetchProps = {
    id: string;
    provider: ServiceProvider;
}

export function TrackCardFetch(props: TrackFetchProps) {
    const [track, setTrack] = useState<Track>();

    useEffect(() => {
        Client.track.getTrackById(props.id, props.provider).then(setTrack);
    }, [props.id, props.provider]);

    return TrackCard(track);
}


export default function TrackCard(props: Track | undefined) {
    // use React native syntax

    return (
        <View />
    )

}
