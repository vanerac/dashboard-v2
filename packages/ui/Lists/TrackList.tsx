import {onClick} from "..";
import {Track} from "../../services";
import {Image, Text, View} from "react-native";

type TrackListProps = {
  tracks: Track[];
  onClick: onClick
};

export default function TrackList(props: TrackListProps) {

  return (
        props.tracks.map((track: Track, index: number) => {
          return (
              <View key={index}>
                <TrackListItem track={track} onClick={props.onClick}/>
              </View>
          )
        })
  )
}


export function TrackListItem(props: {track: Track, onClick: onClick}) {

    /* Todo:
     *  - Like
     *  - Add to playlist
     *  - Add to queue
     *  - Go to artist
     *  - Go to album
     *  - Play Track
     */

  return (
      <View>
        <Text>{props.track.name}</Text>
        <Text>{props.track.artist}</Text>
        <Text>{props.track.album}</Text>
          <Text>{props.track.duration}</Text>
          <Image source={{uri: props.track.image}}/>
          <Text>{props.track.provider}</Text>
          <Text>{props.track.playable}</Text>
      </View>
  )
}
