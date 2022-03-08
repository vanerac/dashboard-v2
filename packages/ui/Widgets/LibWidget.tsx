import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { PlaylistList } from "../Lists/PlaylistList";
// import { useUserMusic } from "@area/app/hooks/useUserMusic";
import { PlaylistWidget } from "./PlaylistWidget";
import { Playlist } from "../../services";

interface WidgetProps {
  deleteWidget: Function;
  widgetKey: number;
  widgetService: string;
  clientAPi: Function;
  handlePlaylistCardClick: (toto: string) => any;
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
  const [selectPlaylist, setSelectPlaylist] = useState<Playlist>();
  const [isLib, setIsLib] = useState<boolean>(true);

  const click = (playlist: Playlist) => {
    console.log(playlist);
    setSelectPlaylist(playlist);
    setIsLib(false);
  };

  const unclick = (playlist: Playlist) => {
    console.log(playlist);
    setIsLib(true);
  };

  useEffect(() => {
    clientAPi()
      .playlist.getAllPlaylists(widgetService)
      .then((dataP: any) => {
        setDataPlaylist(dataP);
        console.log(dataP);
      });
  }, []);

  return (
    <View style={stylesheet.container}>
      {dataPlaylist.length ? (
        isLib ? (
          <PlaylistList
            options={{ provider: false }}
            PlaylistArray={dataPlaylist}
            direction={false}
            column={2}
            handlePlaylistCardClick={click}
          />
        ) : (
          <PlaylistWidget
            deleteWidget={click}
            widgetKey={1}
            widgetService={widgetService}
            clientAPi={clientAPi}
            handlePlaylistCardClick={unclick}
            handleTrackCardClick={() => console.log("track clicked")}
            playlist={selectPlaylist}
          />
        )
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
