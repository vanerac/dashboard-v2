import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Playlist } from "../../services";
import { TrackListType } from "./TrackCard";

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
    width: 260,
    height: 260,
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

const playlistCoverUrl =
  "https://sizze-figma-plugin-images-upload.s3.us-east-2.amazonaws.com/5d251502ed3d3a8171ad5bf5e224e99a";
