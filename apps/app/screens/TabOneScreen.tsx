import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { PlaylistWidget } from '../../../packages/ui/Widgets/PlaylistWidget';
import { getClient } from '../utils/ApiClient';
import { Service } from '../../../packages/services';

export default function TabOneScreen({ navigation: $nav }: RootTabScreenProps<'TabOne'>) {
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

    console.log('user', userServices);
    console.log(loading);

    return (
        <View style={styles.container}>
            {loading ? (
                <PlaylistWidget
                    deleteWidget={test}
                    widgetKey={1}
                    widgetService={userServices[0].id}
                    clientAPi={getClient}
                />
            ) : (
                <Text>sldfkjdfklj</Text>
            )}
            <Text style={styles.title}>Tab One</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <EditScreenInfo path="/screens/TabOneScreen.tsx" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
