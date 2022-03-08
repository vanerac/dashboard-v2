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
import { Track } from "../../services";

export enum TrackCardType {
  CHECKBOX,
  TOGGLE,
  OPTIONS,
}

export type TrackDisplayConfig = {
  title?: boolean;
  artist_album?: boolean;
  type: TrackCardType;
};

export const TrackCard = ({
  config,
  track,
  handleTrackCardClick,
}: {
  config: TrackDisplayConfig;
  track: Track;
  handleTrackCardClick: any;
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <TouchableOpacity
      style={stylesheet.horizontalContainer}
      onPress={handleTrackCardClick}
    >
      <View style={stylesheet.songIdentifiers}>
        <Image style={stylesheet.imageAlbum} source={{ uri: track.image }} />
        <View style={stylesheet.textIdentifiers}>
          <Text style={stylesheet.text}>{track.name}</Text>
          <Text style={stylesheet.text}>{track.artist}</Text>
        </View>
      </View>
      {config.type === TrackCardType.TOGGLE ? (
        <Switch
          style={stylesheet.toggle}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      ) : (
        <></>
      )}
    </TouchableOpacity>
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
    maxWidth: 230,
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
