import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { PlaylistCard, PlaylistDisplayConfig } from "../Cards/PlaylistCard";
import { Playlist } from "../../services";

export const PlaylistList = ({
  PlaylistArray,
  options,
}: {
  PlaylistArray: Array<Playlist>;
  options: PlaylistDisplayConfig;
}) => {
  const DataPlaylistList = ({ playlist }: { playlist: Playlist }) => (
    <PlaylistCard config={{ provider: options.provider }} playlist={playlist} />
  );

  const renderItem = ({ item }: { item: Playlist }) => (
    <DataPlaylistList playlist={item} />
  );

  return (
    <FlatList
      style={stylesheet.container}
      data={PlaylistArray}
      renderItem={renderItem}
      keyExtractor={(_item, index) => index.toString()}
    />
  );
};

const stylesheet = StyleSheet.create({
  container: {
    width: "100%",
  },
});
