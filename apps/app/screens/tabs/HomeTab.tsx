import { StyleSheet, View } from 'react-native';
import React from 'react';
import { RootTabScreenProps } from '../../types';
// import { Test } from '../../../packages/ui';

export default function HomeTab({ navigation: $nav }: RootTabScreenProps<'HomeTab'>) {
    return (
        <View style={styles.container}>
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
