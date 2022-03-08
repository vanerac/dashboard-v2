import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { ArtistList } from "../Lists/ArtistList";
import { Artist } from "../../services";
import { ThemeContext } from "../../../apps/app/constants/ThemeContext";

interface WidgetProps {
  deleteWidget: Function;
  widgetKey: number;
  clientAPi: Function;
}

export const UserTopArtistWidget: React.FC<WidgetProps> = ({
  deleteWidget,
  widgetKey,
  clientAPi,
}) => {
  const $onClickDeleteWidget = () => {
    deleteWidget(widgetKey);
  };

  const { theme } = useContext(ThemeContext);

  const [dataArtist, setDataArtist] = useState([]);
  // const [selectArtist, setSelectArtist] = useState<Artist>();

  const click = (artist: Artist) => {
    console.log(artist);
    // setSelectArtist(artist);
  };

  useEffect(() => {
    clientAPi()
      .stats.getMyTopArtists(20)
      .then((topArtists: any) => {
        setDataArtist(topArtists);
        console.log("Top Artists: ", topArtists);
      });
  }, []);

  return (
    <View style={stylesheet.container}>
      <Text style={{ fontSize: 16, color: theme.text }}>
        Your top Artists :
      </Text>
      {dataArtist.length ? (
        <ArtistList
          options={{ provider: false }}
          ArtistArray={dataArtist}
          direction={true}
          column={2}
          handleArtistListClick={click}
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
