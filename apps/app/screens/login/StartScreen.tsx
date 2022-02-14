import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemeContext } from '../../constants/ThemeContext';
import { AuthenticationService } from '../../../../packages/services';

export default function StartScreen({ navigation }) {
    const { theme } = useContext(ThemeContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    async function makeRequestRegistration() {
        const $res = await AuthenticationService.authRegisterPost({
            email: email,
            password: password,
            displayName: username,
        });
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.primary }]}>
            <View style={[styles.inputView, { backgroundColor: theme.secondary }]}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="email"
                    placeholderTextColor={theme.text}
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                />
            </View>

            <View style={[styles.inputView, { backgroundColor: theme.secondary }]}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="username"
                    placeholderTextColor={theme.text}
                    secureTextEntry={true}
                    value={username}
                    onChangeText={(username) => setUsername(username)}
                />
            </View>

            <View style={[styles.inputView, { backgroundColor: theme.secondary }]}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="password"
                    placeholderTextColor={theme.text}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={[styles.already_registered_button, { color: theme.text }]}>already registered ?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.loginBtn, { backgroundColor: theme.accent }]}>
                <Text style={{ color: theme.text }} onPress={makeRequestRegistration}>
                    Register
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        marginBottom: 40,
    },

    inputView: {
        borderRadius: 30,
        width: '70%',
        height: 45,
        marginBottom: 20,
        alignItems: 'center',
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    already_registered_button: {
        height: 30,
        marginTop: 30,
    },

    loginBtn: {
        width: '70%',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
});
