import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Artist } from "../../services";
import { ThemeContext } from "../../../apps/app/constants/ThemeContext";

export type ArtistDisplayConfig = {
  provider: boolean;
};

export const ArtistCard = ({
  artist,
  config,
  handleArtistCardClick,
}: {
  artist: Artist;
  config: ArtistDisplayConfig;
  handleArtistCardClick: any;
}) => {
  const { theme } = useContext(ThemeContext);
  console.log(artist);
  return (
    <View style={stylesheet.primaryContainer}>
      <Image style={stylesheet.artistCover} source={{ uri: artist.image }} />
      <View style={stylesheet.identifiersContainer}>
        <Text style={stylesheet.artistName}> {artist.name} </Text>
        {config.provider ? (
          <Text style={{ color: theme.text }}>
            {" "}
            - artist - {artist.provider} -{" "}
          </Text>
        ) : (
          <Text style={{ color: theme.text }}>- artist -</Text>
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

  artistName: {
    color: "white",
    fontSize: 17,
    marginBottom: 6,
  },

  artistText: {
    color: "white",
  },

  artistCover: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
});
