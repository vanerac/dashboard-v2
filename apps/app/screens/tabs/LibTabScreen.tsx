import { ScrollView, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import { ThemeContext } from '../../constants/ThemeContext';

export default function LibraryTabScreen({ navigation: $nav }: RootTabScreenProps<'LibraryTab'>) {
    const { theme } = useContext(ThemeContext);

    return (
        <ScrollView style={{ backgroundColor: theme.primary }}>
            <View style={[styles.primaryContainer, { backgroundColor: theme.primary }]}>
                <View style={[styles.topView, { backgroundColor: theme.primary }]}>
                    <Text style={[styles.title, { color: theme.text }]}>Library</Text>
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
