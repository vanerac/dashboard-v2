import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';

import { ThemeContext } from '../../constants/ThemeContext';
import { Client } from '../../../../packages/global';
import { RootStackParamList } from '../../types';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SpotifySSO from '@area/ui/Buttons/SSO/SpotifySSO';

type Props = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

export default function LoginScreen({ navigation }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { theme } = useContext(ThemeContext);

    const [authEndPoint, setAuthEndPoint] = useState('');

    async function makeRequest() {
        try {
            const res = await Client.authentication.login({ email: email, password: password });
            console.log(res);
            navigation.navigate('HomePage');
        } catch (e) {
            Alert.alert('Wrong email or wrong password');
            console.log(e);
        }
    }

    const setSSOUrl = (url: string, service: 'spotify' | 'youtube') => {
        setAuthEndPoint(url);
    };

    const redirectURI = makeRedirectUri({
        native: 'myapp://redirect',
    });

    const url = {
        authorizationEndpoint: Client.sso.spotifyConsentSso(redirectURI),
        // tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
    };

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: 'e3t0ixFSw5lrApAqVPrGMA',
            scopes: Auth.scopes,
            redirectUri: makeRedirectUri({
                native: 'myapp://redirect',
            }),
        },
        url,
    );

    useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;
            api.getAccessToken(code).then((token) => {
                navigation.navigate('Home');
            });
        }
    }, [response]);

    return (
        <View style={[styles.container, { backgroundColor: theme.primary }]}>
            <View>
                <SpotifySSO redirectFn={({ url }) => setSSOUrl.apply(null, url, 'spotify')} callbackURL={redirectURI} />
            </View>
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
                    placeholder="password"
                    placeholderTextColor={theme.textPlaceholder}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>

            <TouchableOpacity>
                <Text style={[styles.forgot_button, { color: theme.text }]}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.loginBtn, { backgroundColor: theme.accent }]}
                onPress={() => makeRequest()}>
                <Text style={{ color: theme.text }}>LOGIN</Text>
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
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
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
