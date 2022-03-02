import React from "react";
import { StyleSheet, FlatList, ScrollView, View } from "react-native";
import { TrackListTest2, TrackListType } from "./TrackListTest2";

type DataTest = TrackListType[];

export const dataTest: DataTest = [
  TrackListType.OPTIONS,
  TrackListType.OPTIONS,
  TrackListType.TOGGLE,
];

export interface ItemListProps<Item> {
  itemDataList: Item[];
  ItemComponent: React.FC<{ item: Item; type: TrackListType }>;
  itemType: TrackListType;
}

const DataTrackList = ({ type }: { type: TrackListType }) => (
  <TrackListTest2 config={{ type: type }} />
);

export const ItemListTest = <Item extends any>({
  itemDataList,
  ItemComponent,
  itemType,
}: ItemListProps<Item>) => {
  // const renderItem = ({ item }: { item: TrackListType }) => (
  //   <DataTrackList type={item} />
  // );

  const renderItem = ({ item }: { item: Item }) => (
    <ItemComponent item={item} type={itemType} />
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
