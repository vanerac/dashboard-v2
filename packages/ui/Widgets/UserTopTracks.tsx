import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { TrackList } from "../Lists/TrackList";
import { Track } from "../../services";
import { TrackCardType } from "../Cards/TrackCard";

interface WidgetProps {
  deleteWidget: Function;
  widgetKey: number;
  clientAPi: Function;
}

export const TopTrackWidget: React.FC<WidgetProps> = ({
  deleteWidget,
  widgetKey,
  clientAPi,
}) => {
  const $onClickDeleteWidget = () => {
    deleteWidget(widgetKey);
  };

  const [dataTrack, setDataTrack] = useState([]);
  // const [selectTrack, setSelectTrack] = useState<Track>();

  const click = (track: Track) => {
    console.log(track);
    // setSelectTrack(track);
  };

  useEffect(() => {
    clientAPi()
      .stats.getMyTopTracks(20)
      .then((topTracks: any) => {
        setDataTrack(topTracks);
        console.log("Top Tracks: ", topTracks);
      });
  }, []);

  return (
    <View style={stylesheet.container}>
      <Text>Your top Tracks :</Text>
      {dataTrack.length ? (
        <TrackList
          trackArray={dataTrack}
          options={{ type: TrackCardType.TOGGLE }}
          handleTrackCardClick={click}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const stylesheet = StyleSheet.create({
  container: {
    marginTop: 30,
    width: "100%",
    height: "100%",
  },

  playlistCard: {
    marginBottom: 20,
  },
});
