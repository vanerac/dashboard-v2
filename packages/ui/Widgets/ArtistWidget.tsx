import React, {useEffect, useState} from "react";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import {ArtistList} from "../Lists/ArtistList";
import {Artist} from "../../services";

interface WidgetProps {
  deleteWidget: Function;
  widgetKey: number;
  widgetService: string;
  clientAPi: Function;
  handleArtistListClick: (toto: string) => any;
}

export const ArtistWidget: React.FC<WidgetProps> = ({
  deleteWidget,
  widgetKey,
  widgetService,
  clientAPi,
  handleArtistListClick,
}) => {
  const $onClickDeleteWidget = () => {
    deleteWidget(widgetKey);
  };

  const [dataArtist, setDataArtist] = useState([]);
  // const [selectArtist, setSelectArtist] = useState<Artist>();

  const click = (artist: Artist) => {
    console.log(artist);
    // setSelectArtist(artist);
  };

  useEffect(() => {
    console.log('getting followed artists')
    clientAPi()
      .artist.getFollowedArtists(widgetService)
      .then((followedArtists: any) => {
        setDataArtist(followedArtists);
        console.log("LDKJDSLKFJSDLFKJSDFLKDJFSLDKFJ", followedArtists);
      });
  }, []);

  return (
    <View style={stylesheet.container}>
      <Text>You've liked :</Text>
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
