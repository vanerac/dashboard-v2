import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Switch } from "react-native";

export const TrackListTest2 = () => {
  // const [isEnabled, setIsEnabled] = useState(false);
  // const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [isSelected, setSelection] = useState(false);

  return (
    <View style={stylesheet.horizontalContainer}>
      <View style={stylesheet.songIdentifiers}>
        <Image style={stylesheet.imageAlbum} source={{ uri: albumTestUrl }} />
        <View style={stylesheet.textIdentifiers}>
          <Text style={stylesheet.text}>song title</Text>
          <Text style={stylesheet.text}>song album title</Text>
        </View>
      </View>
      <Switch style={stylesheet.checkbox} />
    </View>
  );
};

const stylesheet = StyleSheet.create({
  horizontalContainer: {
    height: 70,
    width: "100%",
    backgroundColor: "#212121",
    justifyContent: "space-between",
    alignSelf: "center",
    flexDirection: "row",
  },

  songIdentifiers: {
    justifyContent: "flex-start",
    flexDirection: "row",
  },

  textIdentifiers: {
    marginTop: 15,
    marginBottom: 15,
    justifyContent: "space-around",
  },

  imageAlbum: {
    height: 50,
    width: 50,
    margin: 10,
    borderRadius: 5,
  },

  text: {
    color: "#FFFFFF",
  },

  checkbox: {
    margin: 20,
    alignSelf: "flex-end",
  },
});

const albumTestUrl =
  "https://sizze-figma-plugin-images-upload.s3.us-east-2.amazonaws.com/5d251502ed3d3a8171ad5bf5e224e99a";
