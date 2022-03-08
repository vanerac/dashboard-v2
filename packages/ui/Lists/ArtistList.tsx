import React, { useContext } from "react";
import { FlatList, StyleSheet } from "react-native";
import { ArtistCard, ArtistDisplayConfig } from "../Cards/ArtistCard";
import { Artist } from "../../services";

export const ArtistList = ({
  ArtistArray,
  options,
  direction,
  column,
  handleArtistListClick,
}: {
  ArtistArray: Array<Artist>;
  options: ArtistDisplayConfig;
  direction: boolean;
  column: number;
  handleArtistListClick: (toto: Artist) => any;
}) => {
  const DataArtistList = ({ artist }: { artist: Artist }) => {
    const handleClickTest = (playlist: Artist) => {
      console.log(playlist);
      handleArtistListClick(playlist);
    };

    return (
      <ArtistCard
        config={{ provider: options.provider }}
        artist={artist}
        handleArtistCardClick={() => {
          handleClickTest(artist);
        }}
      />
    );
  };

  const renderItem = ({ item }: { item: Artist }) => (
    <DataArtistList artist={item} />
  );

  return (
    <FlatList
      style={stylesheet.container}
      data={ArtistArray}
      renderItem={renderItem}
      numColumns={column}
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
