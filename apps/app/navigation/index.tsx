import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { useContext } from 'react';
import { ColorSchemeName } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import RegisterScreen from '../screens/login/RegisterScreen';
import LoginScreen from '../screens/login/LoginScreen';
import HomeTabScreen from '../screens/tabs/HomeTabScreen';
import SearchTabScreen from '../screens/tabs/SearchTabScreen';
import LibraryTabScreen from '../screens/tabs/LibraryTabScreen';
import { ThemeContext } from '../constants/ThemeContext';
import { RootStackParamList, RootTabParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
    );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    const { theme } = useContext(ThemeContext);
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                    title: 'Sign in',
                    headerStyle: { backgroundColor: theme.primary },
                    headerTintColor: theme.text,
                }}
            />
            <Stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{
                    title: 'Registration',
                    headerStyle: { backgroundColor: theme.primary },
                    headerTintColor: theme.text,
                }}
            />
            <Stack.Screen
                name="HomePage"
                component={BottomTabNavigator}
                options={{
                    title: 'Home',
                    headerStyle: { backgroundColor: theme.primary },
                    headerTintColor: theme.text,
                    headerShown: false,
                }}
            />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="Modal" component={ModalScreen} />
            </Stack.Group>
        </Stack.Navigator>
    );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export function BottomTabNavigator() {
    const { theme } = useContext(ThemeContext);

    return (
        <BottomTab.Navigator
            initialRouteName="TabOne"
            screenOptions={{
                tabBarActiveTintColor: '#FFFFFF',
                tabBarInactiveBackgroundColor: theme.primary,
                tabBarActiveBackgroundColor: theme.primary,
                tabBarHideOnKeyboard: true,
                tabBarItemStyle: {
                    marginBottom: -30,
                    marginTop: -10,
                },
                tabBarLabelStyle: {
                    marginBottom: 20,
                },
            }}>
            <BottomTab.Screen
                name="HomeTab"
                component={HomeTabScreen}
                options={{
                    title: 'Home',
                    headerStyle: { backgroundColor: theme.primary },
                    tabBarIcon: ({ color }) => <Icon name={'home'} color={color} size={35} />,
                    headerShown: false,
                }}
            />
            <BottomTab.Screen
                name="SearchTab"
                component={SearchTabScreen}
                options={{
                    title: 'Search',
                    headerStyle: { backgroundColor: theme.primary },
                    tabBarIcon: ({ color }) => <Icon name={'magnifying-glass'} color={color} size={35} />,
                    headerShown: false,
                }}
            />
            <BottomTab.Screen
                name="LibraryTab"
                component={LibraryTabScreen}
                options={{
                    title: 'Library',
                    headerStyle: { backgroundColor: theme.primary },
                    tabBarIcon: ({ color }) => <Icon name={'menu'} color={color} size={35} />,
                    headerShown: false,
                }}
            />
        </BottomTab.Navigator>
    );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
export function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
