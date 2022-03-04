import { StyleSheet } from 'react-native';
import React from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
// import { TrackList } from '../../../packages/ui/Lists/TrackList';
// import { TrackDisplayConfig, TrackListType } from '../../../packages/ui/Cards/TrackCard';
// import { dataTest } from '../../../packages/ui/dataTest';

// const testConfig: TrackDisplayConfig = {
//     type: TrackListType.TOGGLE,
// };

export default function TabOneScreen({ navigation: $nav }: RootTabScreenProps<'TabOne'>) {
    return (
        <View style={styles.container}>
            {/*<TrackList trackArray={dataTest} options={testConfig} />*/}
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
