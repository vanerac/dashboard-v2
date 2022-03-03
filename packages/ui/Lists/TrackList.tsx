import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { TrackCard, TrackListType } from "../Cards/TrackCard";
import { Track } from "../../services";

// type DataTest = TrackListType[];
//
// export const dataTest: DataTest = [
//   TrackListType.OPTIONS,
//   TrackListType.OPTIONS,
//   TrackListType.TOGGLE,
// ];

export interface ItemListProps<Item> {
  itemDataList: Item[];
  ItemComponent: React.FC<{ item: Item; track: Track }>;
  // itemType: TrackListType;
}

const DataTrackList = ({ track }: { track: Track }) => (
  <TrackCard track={track} />
);

export const TrackList = <Item extends any>({
  itemDataList,
  ItemComponent,
}: // itemType,
ItemListProps<Item>) => {
  // const renderItem = ({ item }: { item: Item }) => (
  //   <ItemComponent item={item} type={itemType} />
  // );
  const renderItem = ({ item }: { item: Track }) => (
    <DataTrackList track={item} />
  );

  return (
    <FlatList
      style={stylesheet.container}
      data={itemDataList}
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

// parameter ItemList : ?maxHeight: string, Array<Item>, direction: boolean
// Item being all types of card we are gonna put in ItemList (TrackCard, PlaylistCard, ServiceCard, etc)
// flatlist props refreshing et onRefresh
