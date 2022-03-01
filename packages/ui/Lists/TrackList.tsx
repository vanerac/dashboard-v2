import {onClick} from "..";
import {Playlist, Service, Track} from "../../services";
import {Image, Text, View} from "react-native";
import {Client} from "../../global";

type TrackListProps = {
  tracks: Track[];
  onClick: onClick
};

type TrackDisplayConfig = {
  image: boolean;
  title: boolean;
  artist: boolean;
  album: boolean;
  duration: boolean;
};

export default function TrackList(props: TrackListProps) {
  //
  // return (
  //       props.tracks.map((track: Track, index: number) => {
  //         return (
  //             <View key={index}>
  //               <TrackListItem track={track} onClick={props.onClick}/>
  //             </View>
  //         )
  //       })
  // )
}


export function TrackListItem(props: {track: Track, serviceId: string, onClick: onClick, config?: Partial<TrackDisplayConfig>}) {

    /* Todo:
     *  - Like
     *  - Add to playlist
     *  - Add to queue
     *  - Go to artist
     *  - Go to album
     *  - Play Track
     */

    // const playTrack = (track: Track) => {
    //     Client.playback.playTrack({track, serviceId: serviceId });
    // }

    const likeTrack = (service: Service, track: Track) => {
        Client.track.likeTrack(
            track.id,
            service.id, // Shoulb be service ID
        );
    }

    const unLikeTrack = (service: Service, track: Track) => {
        Client.track.unlikeTrack(
            track.id,
            service.id, // Should be service ID
        );
    }

    const addToQueue = (track: Track) => {
        Client.playback.addToQueue({track});
    }

    const addToPlaylist = (service: Service, track: Track, playlist: Playlist) => {
        Client.playlist.addToPlaylist(track.id, service.id, playlist.id);
    }

    const goToAlbum = (track: Track) => {}
    const goToArtist = (track: Track) => {}



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
