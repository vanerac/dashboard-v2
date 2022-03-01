import React, { useContext, useState, useEffect } from 'react';
import { Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { makeRedirectUri, startAsync } from 'expo-auth-session';
import { ThemeContext } from '../../constants/ThemeContext';
// import { Client } from '../../../../packages/global';
import { getClient } from '../../utils/ApiClient';
import { RootStackParamList } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ssoUrl } from '../../../../packages/services';
import Icon from 'react-native-vector-icons/Entypo';
import Constants from 'expo-constants';
import localStorage from 'react-native-sync-localstorage';

const SCHEME = Constants.manifest?.scheme;
const useProxy = Constants.appOwnership === 'expo' && Platform.OS !== 'web';

type Props = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

function SpotifyTriggerSSO({ SSOData, navigation }: { SSOData: ssoUrl } & Props) {
    const { url, redirect_uri } = SSOData;

    const triggerSSO = () => {
        startAsync({
            authUrl: url,
        }).then(({ type, params }: any) => {
            if (type === 'success') {
                const { code } = params;
                getClient()
                    .sso.spotifyAuthCodeSso(code, redirect_uri)
                    .then((data) => {
                        localStorage.setItem('API_TOKEN', data.token);
                        Alert.alert('Success', 'You are now logged in!');
                        navigation.navigate('HomePage');
                    })
                    .catch((err) => {
                        Alert.alert('Error', err.message);
                    });
            } else {
                Alert.alert('Error', 'Something went wrong');
            }
        });
    };

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

export default function LoginScreen({ navigation, route }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { theme } = useContext(ThemeContext);

    async function makeRequest() {
        try {
            const res = await getClient().authentication.login({ email: email, password: password });
            navigation.navigate('HomePage');
        } catch (e) {
            Alert.alert('Wrong email or wrong password');
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
    // create redirect uri
    const redirectURI = makeRedirectUri({
        native: `${SCHEME}://redirect`,
        useProxy,
    });

    useEffect(() => {
        getClient()
            .sso.spotifyConsentSso(redirectURI)
            .then((data: ssoUrl) => {
                setSSOData(data);
            });
    }, []);

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
                    <SpotifyTriggerSSO SSOData={SSOData} navigation={navigation} route={route} />
                </View>
            </View>

            <TouchableOpacity style={[styles.loginBtn, { backgroundColor: theme.accent }]} onPress={makeRequest}>
                <Text style={{ color: theme.text }}>LOGIN</Text>
            </TouchableOpacity>

            <View style={styles.signInButton}>
                <Text style={{ color: theme.text }}>Don't have an account? </Text>
                <TouchableOpacity>
                    <Text
                        style={[styles.signIn, { color: theme.accent }]}
                        onPress={() => navigation.navigate('RegisterScreen')}>
                        Sign Up
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
