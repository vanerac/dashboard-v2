import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { TagCard } from "../Cards/TagCard";
import { Tag } from "../../services";

export const TagList = ({ tagArray }: { tagArray: Array<Tag> }) => {
  const DataTagList = ({ tag }: { tag: Tag }) => <TagCard tag={tag} />;

  const renderItem = ({ item }: { item: Tag }) => <DataTagList tag={item} />;

  return (
    <FlatList
      style={stylesheet.container}
      data={tagArray}
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
