import React, { useContext } from "react";
import { FlatList, StyleSheet } from "react-native";
import { AlbumCard, AlbumDisplayConfig } from "../Cards/AlbumCard";
import { Album } from "../../services";

export const AlbumList = ({
  AlbumArray,
  options,
  direction,
  handleAlbumCardClick,
}: {
  AlbumArray: Array<Album>;
  options: AlbumDisplayConfig;
  direction: boolean;
  handleAlbumCardClick: (toto: Album) => any;
}) => {
  console.log(AlbumArray);
  const DataAlbumList = ({ album }: { album: Album }) => {
    const handleClickTest = (album: Album) => {
      console.log(album);
      handleAlbumCardClick(album);
    };

    return (
      <AlbumCard
        config={{ provider: options.provider }}
        album={album}
        handleAlbumCardClick={() => {
          handleClickTest(album);
        }}
      />
    );
  };

  const renderItem = ({ item }: { item: Album }) => (
    <DataAlbumList album={item} />
  );

  return (
    <FlatList
      style={stylesheet.container}
      data={AlbumArray}
      renderItem={renderItem}
      keyExtractor={(_item, index) => index.toString()}
      horizontal={direction}
    />
  );
};

const stylesheet = StyleSheet.create({
  container: {
    width: "100%",
  },
});
