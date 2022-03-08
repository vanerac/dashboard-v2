import React, { useContext } from "react";
import { FlatList, StyleSheet } from "react-native";
import { PlaylistCard, PlaylistDisplayConfig } from "../Cards/PlaylistCard";
import { Playlist } from "../../services";
import { UserMusicContext } from "../../../apps/app/constants/UserMusicContext";

export const PlaylistList = ({
  PlaylistArray,
  options,
  direction,
  column,
  handlePlaylistCardClick,
}: {
  PlaylistArray: Array<Playlist>;
  options: PlaylistDisplayConfig;
  direction: boolean;
  column: number;
  handlePlaylistCardClick: any;
}) => {
  const { setUserMusic } = useContext(UserMusicContext);

  const DataPlaylistList = ({ playlist }: { playlist: Playlist }) => (
    <PlaylistCard
      config={{ provider: options.provider }}
      playlist={playlist}
      handlePlaylistCardClick={() => {
        setUserMusic(playlist), handlePlaylistCardClick();
      }}
    />
  );

  const renderItem = ({ item }: { item: Playlist }) => (
    <DataPlaylistList playlist={item} />
  );

  return (
    <FlatList
      style={stylesheet.container}
      data={PlaylistArray}
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
