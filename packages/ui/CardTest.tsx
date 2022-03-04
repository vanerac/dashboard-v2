import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Button,
} from "react-native";
// import { getClient } from "../../apps/front/utils/ApiClient";
import { useEffect, useState } from "react";

interface Props {
  deleteWidget: Function;
  widgetKey: number;
  widgetService: string;
  clientAPi: Function;
}

export const CardTest: React.FC<Props> = ({
  deleteWidget,
  widgetKey,
  widgetService,
  clientAPi,
}) => {
  const onClickDeleteWidget = () => {
    deleteWidget(widgetKey);
  };

  const [data_pour_koeck, setData_pour_koeck] = useState([]);

  useEffect(() => {
    clientAPi()
      .playlist.getAllPlaylists(widgetService)
      .then((data: any) => {
        setData_pour_koeck(data);
        console.log(data);
      });
  }, []);

  return (
    <>
      <SafeAreaView style={styles.middle}>
        <ScrollView>
          {/* @ts-ignore */}
          <Button onPress={onClickDeleteWidget} title="okok">
            delete widget
          </Button>
          <Text style={{ color: "white" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  middle: {
    flex: 0.3,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    borderColor: "white",
    borderWidth: 5,
  },
});
