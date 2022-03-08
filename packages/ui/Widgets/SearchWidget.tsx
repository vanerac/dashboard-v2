import React, {useEffect, useState} from "react";
import {ActivityIndicator, ScrollView, StyleSheet} from "react-native";
import {SearchList} from "../Lists/SearchList";

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
    try {
      clientAPi()
          .search.searchGet(widgetService, searchString)
          .then((searchResult: any) => {
            setDataSearch(searchResult);
            console.log(searchResult);
          });
    } catch (error) {
      console.log(error);
    }

  }, []);

  useEffect(() => {
    try {
      clientAPi()
          .search.searchGet(widgetService, searchString)
          .then((searchResult: any) => {
            setDataSearch(searchResult);
            console.log(searchResult);
          });
    } catch (error) {
      console.log(error);
    }

  }, [searchString]);

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
