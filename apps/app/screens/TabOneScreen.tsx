import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
// import { Test } from '../../../packages/ui';
import { PlayerComponent } from '@area/ui/Player/index';
import { AudioPlayer } from '../utils/AudioPlayer';

const device = new AudioPlayer();

export default function TabOneScreen({ navigation: $nav }: RootTabScreenProps<'TabOne'>) {
    useEffect(() => {}, []);
    return (
        <View style={styles.container}>
            {/*<Test />*/}
            <Text style={styles.title}>Tab One</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <EditScreenInfo path="/screens/TabOneScreen.tsx" />
            <PlayerComponent device={device} />
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
