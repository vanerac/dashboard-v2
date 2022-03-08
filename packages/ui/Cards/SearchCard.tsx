import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from "react-native";
// import { CheckBox } from "react-native-elements";
// import Icon from "react-native-vector-icons/Entypo";
import { Track, Artist, Album, Playlist } from "../../services";

export const SearchCard = ({
  data,
}: {
  data: Track | Artist | Album | Playlist;
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={stylesheet.horizontalContainer}>
      <View style={stylesheet.songIdentifiers}>
        <Image style={stylesheet.image} source={{ uri: data.image }} />
        <View style={stylesheet.textIdentifiers}>
          <Text style={stylesheet.text}>{data.name}</Text>
          {/*<Text style={stylesheet.text}>{data.artist}</Text>*/}
        </View>
      </View>
      <Switch
        style={stylesheet.toggle}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
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

  image: {
    height: 50,
    width: 50,
    margin: 10,
    borderRadius: 5,
  },

  text: {
    color: "#FFFFFF",
  },

  toggle: {
    margin: 20,
    alignSelf: "flex-end",
  },

  checkbox: {
    margin: 20,
    alignSelf: "flex-end",
  },

  options: {
    margin: 20,
    alignSelf: "flex-end",
  },
});
