import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import { PlaylistList } from "../Lists/PlaylistList";
// import { useUserMusic } from "@area/app/hooks/useUserMusic";
import { PlaylistWidget } from "./PlaylistWidget";
import { Playlist } from "../../services";
import { ThemeContext } from "../../../apps/app/constants/ThemeContext";

interface WidgetProps {
  deleteWidget: Function;
  widgetKey: number;
  widgetService: string;
  clientAPi: Function;
  // handlePlaylistCardClick: (toto: string) => any;
  isMobileApp: Boolean;
}

export const LibWidget: React.FC<WidgetProps> = ({
  deleteWidget,
  widgetKey,
  widgetService,
  clientAPi,
  isMobileApp,
}) => {
  const onClickDeleteWidget = () => {
    deleteWidget(widgetKey);
  };

  const { theme } = useContext(ThemeContext);

  const [dataPlaylist, setDataPlaylist] = useState([]);
  const [selectPlaylist, setSelectPlaylist] = useState<Playlist>();

  const click = (playlist: Playlist) => {
    setSelectPlaylist(playlist);
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
    <View style={[stylesheet.container, { backgroundColor: theme.primary }]}>
      {!isMobileApp ? (
        <Button onPress={onClickDeleteWidget} title="X" />
      ) : (
        <Text>A toi de jouer koeck</Text>
      )}
      {dataPlaylist.length ? (
        selectPlaylist === undefined ? (
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
            handlePlaylistCardClick={() => console.log("playlist clicked")}
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
    // marginTop: 30,
    width: "100%",
    height: "100%",
  },

  playlistCard: {
    // marginBottom: 20,
  },
});
