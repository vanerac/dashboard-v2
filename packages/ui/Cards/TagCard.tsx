import React, { useContext, useState } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Tag } from "../../services";
import { ThemeContext } from "../../../apps/app/constants/ThemeContext";

export const TagCard = ({ tag }: { tag: Tag }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={stylesheet.container}
      onPress={() => console.log(tag.name)}
    >
      <Text style={{ color: theme.text }}>
        {tag.name} - {tag.count}
      </Text>
    </TouchableOpacity>
  );
};

const stylesheet = StyleSheet.create({
  container: {
    height: 20,
    width: 50,
    backgroundColor: "transparent",
    alignSelf: "center",
    justifyContent: "center",
  },
});
