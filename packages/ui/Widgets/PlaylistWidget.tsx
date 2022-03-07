import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { TrackList } from "../Lists/TrackList";
import { TrackCardType } from "../Cards/TrackCard";
import { PlaylistCard } from "../Cards/PlaylistCard";

interface WidgetProps {
  deleteWidget: Function;
  widgetKey: number;
  widgetService: string;
  clientAPi: Function;
  handleTrackCardClick: any;
  handlePlaylistCardClick: any;
}

export const PlaylistWidget: React.FC<WidgetProps> = ({
  deleteWidget,
  widgetKey,
  widgetService,
  clientAPi,
  handleTrackCardClick,
  handlePlaylistCardClick,
}) => {
  const onClickDeleteWidget = () => {
    deleteWidget(widgetKey);
  };

  const [dataPlaylist, setDataPlaylist] = useState([]);
  const [dataTracks, setDataTracks] = useState([]);

  useEffect(() => {
    clientAPi()
      .playlist.getAllPlaylists(widgetService)
      .then((dataPlaylist: any) => {
        setDataPlaylist(dataPlaylist);
        console.log(dataPlaylist);
        clientAPi()
          .playlist.getPlaylistTracks(widgetService, dataPlaylist[0].id)
          .then((dataTrack: any) => setDataTracks(dataTrack));
      });
  }, []);

  return (
    <ScrollView style={stylesheet.container}>
      {dataPlaylist.length ? (
        <>
          <PlaylistCard
            playlist={dataPlaylist[0]}
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
    </ScrollView>
  );
};

const stylesheet = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },

  playlistCard: {
    marginBottom: 20,
  },
});
