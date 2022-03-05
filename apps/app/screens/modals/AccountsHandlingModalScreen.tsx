import React, { useContext } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { ThemeContext } from '../../constants/ThemeContext';
import Icon from 'react-native-vector-icons/Entypo';

export default function AccountsHandlingModalScreen() {
    const { theme } = useContext(ThemeContext);
    return (
        <ScrollView style={{ backgroundColor: theme.primary }}>
            <View style={[styles.primaryContainer, { backgroundColor: theme.primary }]}>
                <View style={{ alignSelf: 'center', marginBottom: 30 }}>
                    <Icon name="chevron-thin-down" size={25} color={theme.text} />
                </View>
                <View>
                    <Text style={[styles.title, { color: theme.text }]}>Accounts</Text>
                </View>
                <View style={[styles.line, { borderBottomColor: theme.text }]} />
                <View style={styles.secondaryContainer}>
                    <Text style={[styles.serviceText, { color: theme.text }]}>Spotify</Text>
                    <Text style={[styles.serviceText, { color: theme.text }]}>Deezer</Text>
                    <Text style={[styles.serviceText, { color: theme.text }]}>Apple Music</Text>
                    <Text style={[styles.serviceText, { color: theme.text }]}>YouTube Music</Text>
                    <Text style={[styles.serviceText, { color: theme.text }]}>LastFM</Text>
                </View>
            </View>
        </ScrollView>
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
