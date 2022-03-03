import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { TrackCard, TrackDisplayConfig } from "../Cards/TrackCard";
import { Track } from "../../services";

export const TrackList2 = ({
  trackArray,
  options,
}: {
  trackArray: Array<Track>;
  options: TrackDisplayConfig;
}) => {
  const DataTrackList = ({ track }: { track: Track }) => (
    <TrackCard config={{ type: options.type }} track={track} />
  );

  const renderItem = ({ item }: { item: Track }) => (
    <DataTrackList track={item} />
  );

  return (
    <FlatList
      style={stylesheet.container}
      data={trackArray}
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
