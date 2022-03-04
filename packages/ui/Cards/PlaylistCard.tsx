import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Playlist } from "../../services";

export type PlaylistDisplayConfig = {
  provider: boolean;
};

export const PlaylistCard = ({
  playlist,
  config,
}: {
  playlist: Playlist;
  config: PlaylistDisplayConfig;
}) => {
  console.log(playlist);
  return (
    <View style={stylesheet.primaryContainer}>
      <Image
        style={stylesheet.playlistCover}
        source={{ uri: playlist.image }}
      />
      <View style={stylesheet.identifiersContainer}>
        <Text style={stylesheet.playlistTitle}> {playlist.name} </Text>
        {config.provider ? (
          <Text style={stylesheet.playlistOrAlbum}>
            {" "}
            - playlist - {playlist.provider} -{" "}
          </Text>
        ) : (
          <Text style={stylesheet.playlistOrAlbum}>- playlist -</Text>
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

  playlistTitle: {
    color: "white",
    fontSize: 17,
    marginBottom: 6,
  },

  playlistOrAlbum: {
    color: "white",
  },

  playlistCover: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
});
