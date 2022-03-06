import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { RootStackParamList } from '../../types';
import { ThemeContext } from '../../constants/ThemeContext';
import Icon from 'react-native-vector-icons/Octicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'AccountsModal'>;

export default function HomeTabScreen({ navigation }: Props) {
    const { theme } = useContext(ThemeContext);

    return (
        <ScrollView style={{ backgroundColor: theme.primary }}>
            <View style={[styles.primaryContainer, { backgroundColor: theme.primary }]}>
                <View style={[styles.topView, { backgroundColor: theme.primary }]}>
                    <Text style={[styles.title, { color: theme.text }]}>Welcome</Text>
                    <View style={styles.iconView}>
                        <TouchableOpacity onPress={() => navigation.navigate('AccountsModal')}>
                            <Icon style={styles.icons} name="person" size={25} color={theme.text} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('HistoryModal')}>
                            <Icon style={styles.icons} name="clock" size={25} color={theme.text} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon style={styles.icons} name="gear" size={25} color={theme.text} />
                        </TouchableOpacity>
                    </View>
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
        justifyContent: 'space-between',
        width: '100%',
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 30,
    },

    iconView: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginRight: 30,
        width: '23%',
    },

    icons: {
        alignSelf: 'flex-end',
    },

    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
