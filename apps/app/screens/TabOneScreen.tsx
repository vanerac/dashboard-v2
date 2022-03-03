import { StyleSheet } from 'react-native';
import React from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { CardTest } from '../../../packages/ui';
import { getClient } from '../utils/ApiClient';

export default function TabOneScreen({ navigation: $nav }: RootTabScreenProps<'TabOne'>) {
    
    const test = () => {
        console.log("oui oui baguette")
    }
    
    return (
        <View style={styles.container}>
            {/* <CardTest /> */}
            <CardTest deleteWidget={test} widgetKey={1} widgetService={"70410937-2a43-4757-bb7f-48123cdd108f"} clientAPi={getClient}/>
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
