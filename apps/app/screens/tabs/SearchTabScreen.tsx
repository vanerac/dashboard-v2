import { StyleSheet, Text } from 'react-native';
import React, { useContext, useState } from 'react';
import { View, TextInput } from 'react-native';
import { RootTabScreenProps } from '../../types';
import { ThemeContext } from '../../constants/ThemeContext';

export default function SearchTabScreen({ navigation: $nav }: RootTabScreenProps<'SearchTab'>) {
    const { theme } = useContext(ThemeContext);
    const [search, setSearch] = useState('');

    return (
        <View style={[styles.primaryContainer, { backgroundColor: theme.primary }]}>
            <View style={[styles.topView, { backgroundColor: theme.primary }]}>
                <Text style={[styles.title, { color: theme.text }]}>Research</Text>
            </View>
            <View style={[styles.searchBar, { backgroundColor: theme.secondary }]}>
                <TextInput
                    style={[styles.searchBar, { color: theme.text }]}
                    placeholder="Search a title, artist, playlist, album"
                    placeholderTextColor={theme.textPlaceholder}
                    autoCapitalize="none"
                    value={search}
                    onChangeText={(search) => setSearch(search)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    primaryContainer: {
        justifyContent: 'flex-start',
        paddingTop: 70,
        height: '100%',
    },

    searchBar: {
        margin: 20,
        borderRadius: 30,
    },

    topView: {
        flexDirection: 'row',
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 30,
    },

    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
