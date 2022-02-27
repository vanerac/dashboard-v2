// // import React from "react";
// // import { StyleSheet, Text, View } from "react-native";

// // export const TestBis = () => {
// //   return (
// //     <View style={[styles.container, {
// //       // Try setting `flexDirection` to `"row"`.
// //       flexDirection: "column"
// //     }]}>
// //       <View style={{ flex: 1, backgroundColor: "red" }} />
// //       <View style={{ flex: 2, backgroundColor: "darkorange" }} />
// //       <View style={{ flex: 3, backgroundColor: "green" }} />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //   },
// // });

// import * as React from "react";
// import { Text, View, StyleSheet, Image, Button } from "react-native";

// export const TestBis = () => {
//   return (
//     <View style={styles.container}>
//       <View>
//         <Image
//           //   style={styles.card_image}
//           source={{
//             uri: "https://i.picsum.photos/id/881/700/700.jpg?hmac=-JqTJ4_Ped2jYmjiaDgYZOAGzvC0CybCKbROT3GJgZc",
//           }}
//         />
//         <View>
//           <Text>California Festive 2020</Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     borderColor: "black",
//   },
//   card_template: {
//     width: 250,
//     height: 250,
//     boxShadow: "20px 20px 17px -12px rgba(0,0,0,0.75)",
//     borderRadius: 10,
//   },
//   card_image: {
//     width: 150,
//     height: 150,
//     borderRadius: 10,
//   },
//   text_container: {
//     position: "absolute",
//     width: 300,
//     bottom: 0,
//     paddingVertical: 10,
//     backgroundColor: "rgba(0,0,0, 0.1)",
//     borderBottomLeftRadius: 10,
//     borderBottomRightRadius: 10,
//   },
//   card_title: {
//     color: "white",
//     fontSize: 18,
//     marginLeft: 10,
//   },
// });

import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Button,
} from "react-native";

export const CardTest = ({ deleteWidget, widgetKey }) => {
  const onClickDeleteWidget = () => {
    deleteWidget(widgetKey);
  };

  return (
    <>
      <SafeAreaView style={styles.middle}>
        <ScrollView>
          <Button onPress={onClickDeleteWidget}>delete widget</Button>
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
