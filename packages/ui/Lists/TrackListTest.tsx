import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  Switch,
} from "react-native";

export const TrackListTest = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={{ height: Dimensions.get("window").height }}
    >
      <View style={stylesheet.container}>
        <View style={stylesheet.songIdentifiers}>
          <Image style={stylesheet.imageAlbum} source={{ uri: albumTestUrl }} />
          <View style={stylesheet.songTextIdentifiers}>
            <View
              style={[
                stylesheet.songTitle,
                { display: "flex", flexDirection: "row", alignItems: "center" },
              ]}
            >
              <Text
                style={[
                  stylesheet.songTitle,
                  {
                    position: "relative",
                    flexGrow: 1,
                    left: 0,
                    top: 0,
                    height: "auto",
                    transform: [{ translateX: 0 }, { translateY: 0 }],
                  },
                ]}
              >
                Look at this boug
              </Text>
            </View>
            <View
              style={[
                stylesheet.songAlbumTitle,
                { display: "flex", flexDirection: "row", alignItems: "center" },
              ]}
            >
              <Text
                style={[
                  stylesheet.songAlbumTitle,
                  {
                    position: "relative",
                    flexGrow: 1,
                    left: 0,
                    top: 0,
                    height: "auto",
                    transform: [{ translateX: 0 }, { translateY: 0 }],
                  },
                ]}
              >
                Miskin in the dark
              </Text>
            </View>
          </View>
        </View>
        <View style={stylesheet._Ellipse_1}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const stylesheet = StyleSheet.create({
  container: {
    position: "relative",
    width: Dimensions.get("window").width,
    height: "auto",
    borderRadius: 0,
    overflow: "hidden",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    backgroundColor: "rgba(32, 32, 32, 1)",
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 13,
    paddingBottom: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    left: 0,
    top: 0,
  },
  songIdentifiers: {
    position: "relative",
    width: "auto",
    height: "100%",
    borderRadius: 0,
    minWidth: 0,
    flexBasis: 0,
    flexGrow: 1,
    transform: [{ translateX: 0 }, { translateY: 0 }],
    backgroundColor: "rgba(0,0,0,0)",
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    display: "flex",
    flexDirection: "row",
    flexShrink: 0,
    marginRight: 10,
  },
  imageAlbum: {
    position: "relative",
    width: 44,
    height: "100%",
    borderRadius: 5,
    opacity: 1,
    minWidth: 0,
    transform: [{ translateX: 0 }, { translateY: 0 }],
    backgroundColor: "rgba(0,0,0,0)",
    flexShrink: 0,
    marginRight: 10,
  },
  songTextIdentifiers: {
    position: "relative",
    width: "auto",
    height: 44,
    borderRadius: 0,
    minWidth: 0,
    flexBasis: 0,
    flexGrow: 1,
    transform: [{ translateX: 0 }, { translateY: 0 }],
    backgroundColor: "rgba(0,0,0,0)",
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexShrink: 0,
  },
  songTitle: {
    position: "relative",
    width: 63,
    height: 11,
    minWidth: 0,
    transform: [{ translateX: 0 }, { translateY: 0 }],
    textDecorationLine: "none",
    fontSize: 12,
    color: "#FFFFFF",
    textAlign: "left",
    textAlignVertical: "top",
    letterSpacing: 0.1,
    flexShrink: 0,
    marginBottom: 8,
  },
  songAlbumTitle: {
    position: "relative",
    width: 49,
    height: 8,
    minHeight: 8,
    minWidth: 0,
    transform: [{ translateX: 0 }, { translateY: 0 }],
    textDecorationLine: "none",
    fontSize: 10,
    color: "rgba(255, 255, 255, 1)",
    textAlign: "left",
    textAlignVertical: "top",
    letterSpacing: 0.1,
    flexShrink: 0,
  },
  _Ellipse_1: {
    transform: [{ translateX: 0 }, { translateY: 0 }],
    flexShrink: 0,
  },
});

const albumTestUrl =
  "https://sizze-figma-plugin-images-upload.s3.us-east-2.amazonaws.com/5d251502ed3d3a8171ad5bf5e224e99a";
