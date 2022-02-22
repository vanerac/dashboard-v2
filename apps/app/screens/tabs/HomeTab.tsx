import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';

import { RootTabScreenProps } from '../../types';
import { ThemeContext } from '../../constants/ThemeContext';

export default function HomeTab({ navigation: $nav }: RootTabScreenProps<'HomeTab'>) {
    const { theme } = useContext(ThemeContext);
    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity style={[styles.loginBtn, { backgroundColor: theme.accent }]}>
                    <Text style={{ color: theme.text }}>connect to Spotify</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <TouchableOpacity style={[styles.loginBtn, { backgroundColor: theme.accent }]}>
                    <Text style={{ color: theme.text }}>connect to Deezer</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <TouchableOpacity style={[styles.loginBtn, { backgroundColor: theme.accent }]}>
                    <Text style={{ color: theme.text }}>connect to AppleMusic</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <TouchableOpacity style={[styles.loginBtn, { backgroundColor: theme.accent }]}>
                    <Text style={{ color: theme.text }}>connect to YouTube Music</Text>
                </TouchableOpacity>
            </View>
        </>
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
    loginBtn: {
        width: '80%',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
});
