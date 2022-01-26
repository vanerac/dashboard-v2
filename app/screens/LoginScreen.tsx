import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import React from 'react';

import { LoginEntry } from '../components/login/LoginEntry';
export default function LoginScreen({ onPress }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>WElCOME</Text>
            <LoginEntry onPress={onPress} />
            <TouchableOpacity onPress={() => console.log('wallah')}>
                <Text> lkejflfj </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(7, 11, 43)',
    },
    title: {
        color: 'white',
    },
});
