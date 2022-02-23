import React, { useContext, useEffect, useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { ThemeContext } from '../../constants/ThemeContext';
import { Client } from '../../../../packages/global';
import { RootStackParamList } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ssoUrl } from '@area/services';
import Icon from 'react-native-vector-icons/Entypo';
import Constants from 'expo-constants';

const SCHEME = Constants.manifest?.scheme;
const useProxy = Constants.appOwnership === 'expo' && Platform.OS !== 'web';

type Props = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

function SpotifyTriggerSSO({ SSOData }: { SSOData: ssoUrl }, { navigation }: Props) {
    // console.log('SSOData', SSOData);
    const redirectURI = makeRedirectUri({
        native: `${SCHEME}://redirect`,
        useProxy,
    });
    const ssoData.redirectUri.startAsync();

    const [$request, response, promptAsync] = useAuthRequest(
        {
            clientId: SSOData.client_id,
            redirectUri: SSOData.redirect_uri,
            scopes: SSOData.scopes,
        },
        {
            authorizationEndpoint: SSOData.base_url,
        },
    );

    const [code, setCode] = useState('');

    const triggerSSO = async () => {
        try {
            console.log('trigger');
            await promptAsync();
        } catch (e: any) {
            Alert.alert('Error', e.message);
        }
    };

    useEffect(() => {
        console.log('got response');
        if (response && response.type === 'success') {
            console.log('valid response');
            setCode(response.params.code);
        }
    }, [response]);

    useEffect(() => {
        if (code) {
            console.log('got code');
            (async () => {
                const token = await Client.sso.spotifyAuthCodeSso(code, SSOData.redirect_uri);
                console.log(token);
                Alert.alert(`Welcome`);
            })();
        }
    }, [code]);

    if (!SSOData.url) {
        return null;
    }

    return (
        <View>
            <TouchableOpacity onPress={triggerSSO}>
                <Text>
                    <Icon name="spotify" size={40} color="#1DB954" />
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default function LoginScreen({ navigation }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { theme } = useContext(ThemeContext);

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

    const [SSOData, setSSOData] = useState<ssoUrl>({
        response_type: '',
        scope: '',
        url: '',
        client_id: '',
        redirect_uri: 'com.spotify.music://',
        base_url: '',
    });
    // console.log({ SCHEME });
    // create redirect url

    Client.sso.spotifyConsentSso(redirectURI).then((data: ssoUrl) => {
        setSSOData(data);
    });

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
                    placeholder="password"
                    placeholderTextColor={theme.textPlaceholder}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>

            <View style={styles.forgotPassword}>
                <TouchableOpacity onPress={() => Alert.alert('Not implemented yet')}>
                    <Text style={{ color: theme.text }}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.ssoText}>
                <Text style={{ color: theme.text }}>Or log in with :</Text>
                <View style={styles.ssoIcons}>
                    <SpotifyTriggerSSO SSOData={SSOData} />
                </View>
            </View>

            <TouchableOpacity
                style={[styles.loginBtn, { backgroundColor: theme.accent }]}
                onPress={() => makeRequest()}>
                <Text style={{ color: theme.text }}>LOGIN</Text>
            </TouchableOpacity>

            <View style={styles.signInButton}>
                <Text style={{ color: theme.text }}>Already registered? </Text>
                <TouchableOpacity>
                    <Text
                        style={[styles.signIn, { color: theme.accent }]}
                        onPress={() => navigation.navigate('RegisterScreen')}>
                        Sign In
                    </Text>
                </TouchableOpacity>
            </View>
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

    signInButton: {
        flexDirection: 'row',
        height: 30,
        marginBottom: 30,
        marginTop: 30,
    },

    signIn: {
        fontWeight: 'bold',
    },

    forgotPassword: {
        width: '67%',
        alignItems: 'flex-end',
        marginBottom: 35,
        marginTop: 5,
    },

    ssoText: {
        width: '67%',
        alignItems: 'flex-start',
        marginBottom: 35,
        marginTop: 5,
    },

    ssoIcons: {
        width: '67%',
        alignItems: 'flex-start',
        marginTop: 20,
    },

    loginBtn: {
        width: '70%',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
});
