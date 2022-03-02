import React from "react";
import { StyleSheet, FlatList, ScrollView, View } from "react-native";
import { TrackListTest2, TrackListType } from "./TrackListTest2";

type DataTest = TrackListType[];

const dataTest: DataTest = [
  TrackListType.OPTIONS,
  TrackListType.CHECKBOX,
  TrackListType.TOGGLE,
];

const DataList = ({ type }: { type: TrackListType }) => (
  <TrackListTest2 config={{ type: type }} />
);

export const ItemListTest = () => {
  const _renderItem = ({ item }: { item: TrackListType }) => (
    <DataList type={item} />
  );

  return (
    <ScrollView style={[stylesheet.container, {}]}>
      <FlatList data={dataTest} renderItem={_renderItem} />
    </ScrollView>
  );
};

const stylesheet = StyleSheet.create({
  container: {
    width: "100%",
  },
});
