import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemeContext } from '../../constants/ThemeContext';
import { RootStackParamList } from '../../types';
import { getClient } from '../../utils/ApiClient';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

// import TopBar from '../../../front/components/topBar';

type Props = NativeStackScreenProps<RootStackParamList, 'RegisterScreen'>;

export default function RegisterScreen({ navigation }: Props) {
    const { theme } = useContext(ThemeContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    function makeRequestRegistration() {
        getClient()
            .authentication.register({
                email: email,
                password: password,
                displayName: username,
            })
            .then(() => {
                navigation.navigate('LoginScreen');
            })
            .catch((error) => {
                Alert.alert(error.message);
            });
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.primary }]}>
            <View style={[styles.inputView, { backgroundColor: theme.secondary }]}>
                <TextInput
                    style={[styles.TextInput, { color: theme.text }]}
                    placeholder="email"
                    placeholderTextColor={theme.textPlaceholder}
                    autoCapitalize="none"
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                />
            </View>

            <View style={[styles.inputView, { backgroundColor: theme.secondary }]}>
                <TextInput
                    style={[styles.TextInput, { color: theme.text }]}
                    placeholder="username"
                    placeholderTextColor={theme.textPlaceholder}
                    value={username}
                    onChangeText={(username) => setUsername(username)}
                />
            </View>

            <View style={[styles.inputView, { backgroundColor: theme.secondary }]}>
                <TextInput
                    style={[styles.TextInput, { color: theme.text }]}
                    placeholder="password"
                    placeholderTextColor={theme.textPlaceholder}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>

            <TouchableOpacity style={[styles.loginBtn, { backgroundColor: theme.accent }]}>
                <Text
                    style={{ color: theme.text }}
                    onPress={() => {
                        makeRequestRegistration();
                    }}>
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
