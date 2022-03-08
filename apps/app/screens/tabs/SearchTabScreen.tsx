import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput } from 'react-native';
import { RootTabScreenProps } from '../../types';
import { ThemeContext } from '../../constants/ThemeContext';
import { Service } from '../../../../packages/services';
import { getClient } from '../../utils/ApiClient';
import { SearchWidget } from '../../../../packages/ui/Widgets/SearchWidget';

export default function SearchTabScreen({ navigation: $nav }: RootTabScreenProps<'SearchTab'>) {
    const { theme } = useContext(ThemeContext);
    const [search, setSearch] = useState('');

    const test = () => {
        console.log('oui oui baguette');
    };

    const [userServices, setUserServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getClient()
            .services.getAllUserServices()
            .then((services) => setUserServices(services.services as Service[]))
            .then(() => setLoading(true));
    }, []);

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
                {loading ? (
                    <SearchWidget
                        deleteWidget={test}
                        widgetKey={1}
                        widgetService={userServices[0].id}
                        clientAPi={getClient}
                        searchString={search}
                    />
                ) : (
                    <ActivityIndicator />
                )}
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
