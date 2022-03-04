import React, { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { TrackList } from "../Lists/TrackList";
import { TrackCardType } from "../Cards/TrackCard";
import { PlaylistCard, PlaylistDisplayConfig } from "../Cards/PlaylistCard";

interface WidgetProps {
  deleteWidget: Function;
  widgetKey: number;
  widgetService: string;
  clientAPi: Function;
}

export const PlaylistWidget: React.FC<WidgetProps> = ({
  deleteWidget,
  widgetKey,
  widgetService,
  clientAPi,
}) => {
  const onClickDeleteWidget = () => {
    deleteWidget(widgetKey);
  };

  const [dataPlaylist, setDataPlaylist] = useState([]);
  const [dataTracks, setDataTracks] = useState([]);

  useEffect(() => {
    clientAPi()
      .playlist.getAllPlaylists(widgetService)
      .then((dataP: any) => {
        setDataPlaylist(dataP);
        console.log(dataP);
        clientAPi()
          .playlist.getPlaylistTracks(widgetService, dataP[0].id)
          .then((dataT: any) => setDataTracks(dataT));
      });
  }, []);

  return (
    <ScrollView style={stylesheet.container}>
      {dataPlaylist.length ? (
        <>
          <PlaylistCard
            playlist={dataPlaylist[0]}
            config={{ provider: true }}
          />
          <TrackList
            trackArray={dataTracks}
            options={{ type: TrackCardType.OPTIONS }}
          />
        </>
      ) : (
        <Text>flsdkjfdlskfjsdlkj</Text>
      )}
    </ScrollView>
  );
};

const stylesheet = StyleSheet.create({
  container: {
    width: "100%",
  },

  playlistCard: {
    marginBottom: 20,
  },
});
