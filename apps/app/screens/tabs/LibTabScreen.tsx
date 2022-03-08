import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { RootTabScreenProps } from '../../types';
import { ThemeContext } from '../../constants/ThemeContext';

import { Service } from '../../../../packages/services';
import { getClient } from '../../utils/ApiClient';
// import { useUserMusic } from '../../hooks/useUserMusic';

import { LibWidget } from '../../../../packages/ui/Widgets/LibWidget';

export default function LibraryTabScreen({ navigation: $nav }: RootTabScreenProps<'LibraryTab'>) {
    const { theme } = useContext(ThemeContext);
    // const { userMusic } = useUserMusic();

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

    // const handlePlaylistCardClick = () => {
    //     console.log('USER MUSIC', userMusic);
    //     nav.navigate('PlaylistModal');
    // };

    return (
        <View style={{ backgroundColor: theme.primary }}>
            <View style={[styles.primaryContainer, { backgroundColor: theme.primary }]}>
                <View style={[styles.topView, { backgroundColor: theme.primary }]}>
                    <Text style={[styles.title, { color: theme.text }]}>Library</Text>
                </View>
                {loading ? (
                    <LibWidget
                        deleteWidget={test}
                        widgetKey={1}
                        widgetService={userServices[0].id}
                        clientAPi={getClient}
                        isMobileApp={true}
                        // handlePlaylistCardClick={handlePlaylistCardClick}
                    />
                ) : (
                    <>
                        <Text>sldkfjsldfkjs</Text>
                        <ActivityIndicator />
                    </>
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
