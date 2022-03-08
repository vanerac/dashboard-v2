import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { SearchList } from "../Lists/SearchList";

interface WidgetProps {
  deleteWidget: Function;
  widgetKey: number;
  widgetService: string;
  clientAPi: Function;
  searchString: string;
}

export const SearchWidget: React.FC<WidgetProps> = ({
  deleteWidget,
  widgetKey,
  widgetService,
  clientAPi,
  searchString,
}) => {
  const $onClickDeleteWidget = () => {
    deleteWidget(widgetKey);
  };

  const [dataSearch, setDataSearch] = useState([]);

  useEffect(() => {
    clientAPi()
      .search.searchGet(widgetService, searchString)
      .then((searchResult: any) => {
        setDataSearch(searchResult);
        console.log(searchResult);
      });
  }, []);

  return (
    <ScrollView style={stylesheet.container}>
      {dataSearch.length ? (
        <SearchList searchResults={dataSearch} />
      ) : (
        <ActivityIndicator />
      )}
    </ScrollView>
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

  // searchBar: {
  //   margin: 20,
  //   borderRadius: 30,
  // },
});
