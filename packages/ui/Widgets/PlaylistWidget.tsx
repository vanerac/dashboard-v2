import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getClient } from "../../../apps/app/utils/ApiClient";
import { Playlist, Service } from "../../services";

export const PlaylistWidget = () => {
  return (
    <View style={stylesheet.container}>
      <Text>PlaylistWidget</Text>
    </View>
  );
};

const stylesheet = StyleSheet.create({
  container: {
    width: "100%",
  },
});
