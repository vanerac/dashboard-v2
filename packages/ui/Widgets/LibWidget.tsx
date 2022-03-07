import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { PlaylistList } from "../Lists/PlaylistList";

interface WidgetProps {
  deleteWidget: Function;
  widgetKey: number;
  widgetService: string;
  clientAPi: Function;
  handlePlaylistCardClick: any;
}

export const LibWidget: React.FC<WidgetProps> = ({
  deleteWidget,
  widgetKey,
  widgetService,
  clientAPi,
  handlePlaylistCardClick,
}) => {
  const $onClickDeleteWidget = () => {
    deleteWidget(widgetKey);
  };

  const [dataPlaylist, setDataPlaylist] = useState([]);

  useEffect(() => {
    clientAPi()
      .playlist.getAllPlaylists(widgetService)
      .then((dataP: any) => {
        setDataPlaylist(dataP);
        // console.log(dataP);
      });
  }, []);

  return (
    <View style={stylesheet.container}>
      {dataPlaylist.length ? (
        <PlaylistList
          options={{ provider: false }}
          PlaylistArray={dataPlaylist}
          direction={false}
          column={2}
          handlePlaylistCardClick={handlePlaylistCardClick}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const stylesheet = StyleSheet.create({
  container: {
    marginTop: 30,
    width: "100%",
    height: "100%",
  },

  playlistCard: {
    marginBottom: 20,
  },
});
