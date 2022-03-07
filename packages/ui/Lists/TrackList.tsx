import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { TrackCard, TrackDisplayConfig } from "../Cards/TrackCard";
import { Track } from "../../services";

export const TrackList = ({
  trackArray,
  options,
  handleTrackCardClick,
}: {
  trackArray: Array<Track>;
  options: TrackDisplayConfig;
  handleTrackCardClick: any;
}) => {
  const DataTrackList = ({ track }: { track: Track }) => (
    <TrackCard
      config={{ type: options.type }}
      track={track}
      handleTrackCardClick={handleTrackCardClick}
    />
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
      scrollEnabled={true}
    />
  );
};

const stylesheet = StyleSheet.create({
  container: {
    width: "100%",
  },
});
