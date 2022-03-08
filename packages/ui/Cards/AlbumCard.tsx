import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Album } from "../../services";
import { ThemeContext } from "../../../apps/app/constants/ThemeContext";

export type AlbumDisplayConfig = {
  provider: boolean;
};

export const AlbumCard = ({
  album,
  config,
  handleAlbumCardClick,
}: {
  album: Album;
  config: AlbumDisplayConfig;
  handleAlbumCardClick: any;
}) => {
  const { theme } = useContext(ThemeContext);
  console.log(album);
  return (
    <View style={stylesheet.primaryContainer}>
      <Image style={stylesheet.albumCover} source={{ uri: album.image }} />
      <View style={stylesheet.identifiersContainer}>
        <Text style={stylesheet.albumName}> {album.name} </Text>
        {config.provider ? (
          <Text style={{ color: theme.text }}>
            {" "}
            - album - {album.provider} -{" "}
          </Text>
        ) : (
          <Text style={{ color: theme.text }}>- album -</Text>
        )}
      </View>
    </View>
  );
};

const stylesheet = StyleSheet.create({
  primaryContainer: {
    backgroundColor: "#212121",
    alignItems: "center",
    width: "100%",
    height: 260,
    minHeight: 260,
  },

  identifiersContainer: {
    alignItems: "center",
    justifyContent: "space-around",
    margin: 13,
  },

  albumName: {
    color: "white",
    fontSize: 17,
    marginBottom: 6,
  },

  albumText: {
    color: "white",
  },

  albumCover: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
});
