import React, {useEffect, useState} from "react";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import {AlbumList} from "../Lists/AlbumList";
import {Album} from "../../services";

interface WidgetProps {
  deleteWidget: Function;
  widgetKey: number;
  clientAPi: Function;
  widgetService: string;
}

export const AlbumWidget: React.FC<WidgetProps> = ({
  deleteWidget,
  widgetKey,
  clientAPi,
  widgetService
}) => {
  const $onClickDeleteWidget = () => {
    deleteWidget(widgetKey);
  };

  console.log(widgetService)

  const [dataAlbum, setDataAlbum] = useState([]);
  // const [selectAlbum, setSelectAlbum] = useState<Album>();

  const click = (album: Album) => {
    console.log(album);
    // setSelectAlbum(album);
  };

  useEffect(() => {
    clientAPi()
      .album.getAllSavedAlbums(widgetService)
      .then((savedAlbums: any) => {
        setDataAlbum(savedAlbums);
        console.log("LDKJDSLKFJSDLFKJSDFLKDJFSLDKFJ", savedAlbums);
      });
  }, []);

  return (
    <View style={stylesheet.container}>
      <Text>You've saved :</Text>
      {dataAlbum ? (
        <AlbumList
          options={{ provider: false }}
          AlbumArray={dataAlbum}
          direction={true}
          handleAlbumCardClick={click}
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
