import {Artist} from "../../services";
import React, {useEffect, useState} from 'react'
import {View} from "react-native";
import {Client} from "../../utils";
import {onClick, ServiceProvider} from "../index";

type ArtistFetchProps = {
    id: string;
    provider: ServiceProvider;
}

type ArtistCardProps = {
    artist: Artist;
    onClick: onClick
}

export function ArtistCardFetch(props: ArtistFetchProps & { onClick: onClick }) {
    const [Artist, setArtist] = useState<Artist>();

    useEffect(() => {
        Client.artist.getArtistById(props.id, props.provider).then(setArtist);
    }, [props.id, props.provider]);

    if (!Artist) {
        return <View/>;
    }
    return ArtistCard({artist: Artist, onClick: props.onClick});
}


export default function ArtistCard(props: ArtistCardProps) {
    // use React native syntax

    return (
        <View />
    )

}
