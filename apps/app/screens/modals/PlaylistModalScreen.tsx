import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { ThemeContext } from '../../constants/ThemeContext';
import { getClient } from '../../utils/ApiClient';
import { PlaylistWidget } from '../../../../packages/ui/Widgets/PlaylistWidget';
import { Service } from '../../../../packages/services';
import { useUserMusic } from '../../hooks/useUserMusic';

export default function PlaylistModalScreen() {
    const { theme } = useContext(ThemeContext);
    const { userMusic } = useUserMusic();

    const test = () => {
        console.log('oui oui baguette');
    };

    const handlePlaylistCardClick = () => {
        console.log('PlaylistCardPressed');
    };

    const handleTrackCardClick = () => {
        console.log('TrackCardPressed');
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
        <View style={{ backgroundColor: theme.primary }}>
            <View style={[styles.primaryContainer, { backgroundColor: theme.primary }]}>
                {loading && userMusic ? (
                    <PlaylistWidget
                        deleteWidget={test}
                        widgetKey={1}
                        widgetService={userServices[0].id}
                        clientAPi={getClient}
                        handlePlaylistCardClick={handlePlaylistCardClick}
                        handleTrackCardClick={handleTrackCardClick}
                        playlist={userMusic}
                    />
                ) : (
                    <ActivityIndicator />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    line: {
        borderBottomWidth: 1,
        marginTop: 42,
        width: '80%',
        marginLeft: '10%',
    },

    primaryContainer: {
        justifyContent: 'flex-start',
        paddingTop: 70,
        height: '100%',
    },

    secondaryContainer: {
        justifyContent: 'flex-start',
        marginLeft: 30,
        marginTop: 40,
        backgroundColor: 'transparent',
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 30,
    },

    serviceText: {
        fontSize: 22,
        margin: 10,
    },

    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
