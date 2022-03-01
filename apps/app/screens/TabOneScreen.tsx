import { StyleSheet } from 'react-native';
import React from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { TrackListTest } from '../../../packages/ui/Lists/TrackListTest';
import { TrackListTest2 } from '../../../packages/ui/Lists/TrackListTest2';
// import { Test } from '../../../packages/ui';

export default function TabOneScreen({ navigation: $nav }: RootTabScreenProps<'TabOne'>) {
    return (
        <View style={styles.container}>
            {/*<Test />*/}
            <TrackListTest />
            <TrackListTest2 />
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
