import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { TagList } from "../Lists/TagList";
import { Tag } from "../../services";
import { ThemeContext } from "../../../apps/app/constants/ThemeContext";

interface WidgetProps {
  deleteWidget: Function;
  widgetKey: number;
  clientAPi: Function;
}

export const UserTopTagsWidget: React.FC<WidgetProps> = ({
  deleteWidget,
  widgetKey,
  clientAPi,
}) => {
  const $onClickDeleteWidget = () => {
    deleteWidget(widgetKey);
  };

  const { theme } = useContext(ThemeContext);

  const [dataTrack, setDataTrack] = useState([]);
  // const [selectTrack, setSelectTrack] = useState<Track>();

  const click = (track: Tag) => {
    console.log(track);
    // setSelectTrack(track);
  };

  useEffect(() => {
    clientAPi()
      .stats.getMyTopTags(20)
      .then((topTags: any) => {
        setDataTrack(topTags);
        console.log("Top Tags: ", topTags);
      });
  }, []);

  return (
    <View style={stylesheet.container}>
      <Text style={{ fontSize: 16, color: theme.text }}>
        Your most favorite tags :
      </Text>
      {dataTrack.length ? (
        <TagList tagArray={dataTrack} />
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
