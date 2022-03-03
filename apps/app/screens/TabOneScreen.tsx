import { StyleSheet } from 'react-native';
import React from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { TrackCard, TrackListType } from '../../../packages/ui/Cards/TrackCard';
import { TrackList } from '../../../packages/ui/Lists/TrackList';

// const TrackListWrapper = ({ item }: { item: TrackListType; type: TrackListType }) => (
//     <TrackListTest2 config={{ type: item }} />
// );
//
// const TestComponent = ({ item }: { item: TrackListType }) => {
//     return (
//         <View style={{ backgroundColor: 'red', width: '100%', height: 60 }}>
//             <Text>{item}</Text>
//         </View>
//     );
// };

export default function TabOneScreen({ navigation: $nav }: RootTabScreenProps<'TabOne'>) {
    return (
        <View style={styles.container}>
            {/*<TrackListTest2 config={{ type: TrackListType.OPTIONS }} />*/}
            <TrackList itemDataList={dataTest} ItemComponent={TrackCard} itemType={TrackListType.TOGGLE} />
            <TrackList itemDataList={dataTest} ItemComponent={TrackCard} itemType={TrackListType.OPTIONS} />
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
