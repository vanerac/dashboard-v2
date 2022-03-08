import React, {useEffect, useState} from "react";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {TrackList} from "../Lists/TrackList";
import {Playlist} from "../../services";
import {TrackCardType} from "../Cards/TrackCard";
import {PlaylistCard} from "../Cards/PlaylistCard";

interface WidgetProps {
  deleteWidget: Function;
  widgetKey: number;
  widgetService: string;
  clientAPi: Function;
  handleTrackCardClick: any;
  handlePlaylistCardClick: any;
  playlist: Playlist;
}

export const PlaylistWidget: React.FC<WidgetProps> = ({
  deleteWidget,
  widgetKey,
  widgetService,
  clientAPi,
  handleTrackCardClick,
  handlePlaylistCardClick,
  playlist,
}) => {
  const onClickDeleteWidget = () => {
    deleteWidget(widgetKey);
  };

  // const { setUserMusic } = useContext(UserMusicContext);
  // const [dataPlaylist, setDataPlaylist] = useState([]);
  const [dataTracks, setDataTracks] = useState([]);

  console.log('playlist', playlist);

  useEffect(() => {
    clientAPi()
      .playlist.getPlaylistTracks(widgetService, playlist.id)
      .then((dataTrack: any) => {
        setDataTracks(dataTrack);
        // console.log(data);
      });
  }, []);

  return (
    <View style={stylesheet.container}>
      {playlist ? (
        <>
          <PlaylistCard
            playlist={playlist}
            config={{ provider: true }}
            handlePlaylistCardClick={handlePlaylistCardClick}
          />
          <TrackList
            trackArray={dataTracks}
            options={{ type: TrackCardType.TOGGLE }}
            handleTrackCardClick={handleTrackCardClick}
          />
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const stylesheet = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },

  playlistCard: {
    marginBottom: 20,
  },
});
