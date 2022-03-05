import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import { RootTabScreenProps } from '../../types';
import { ThemeContext } from '../../constants/ThemeContext';

export default function HomeTabScreen({ navigation: $nav }: RootTabScreenProps<'HomeTab'>) {
    const { theme } = useContext(ThemeContext);

    return (
        <ScrollView style={{ backgroundColor: theme.primary }}>
            <View style={[styles.primaryContainer, { backgroundColor: theme.primary }]}>
                <View style={[styles.topView, { backgroundColor: theme.primary }]}>
                    <Text style={[styles.title, { color: theme.text }]}>Welcome</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    primaryContainer: {
        justifyContent: 'flex-start',
        paddingTop: 70,
        height: '100%',
    },

    topView: {
        flex: 1,
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
