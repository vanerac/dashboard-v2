import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { SearchCard } from "../Cards/SearchCard";
import { SearchResult, Track, Album, Artist, Playlist } from "../../services";

export const SearchList = ({
  searchResults,
}: {
  searchResults: Array<Track | Album | Artist | Playlist>;
}) => {
  const DataSearchList = ({
    result,
  }: {
    result: Track | Album | Artist | Playlist;
  }) => <SearchCard data={result} />;

  const renderItem = ({
    item,
  }: {
    item: Track | Album | Artist | Playlist;
  }) => <DataSearchList result={item} />;

  return (
    <FlatList
      style={stylesheet.container}
      data={searchResults}
      renderItem={renderItem}
      keyExtractor={(_item, index) => index.toString()}
      scrollEnabled={false}
    />
  );
};

const stylesheet = StyleSheet.create({
  container: {
    width: "100%",
  },
});
