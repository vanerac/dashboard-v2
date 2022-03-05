import { StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import { ThemeContext } from '../../constants/ThemeContext';

export default function SearchTabScreen({ navigation: $nav }: RootTabScreenProps<'SearchTab'>) {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={[styles.container, { backgroundColor: theme.primary }]}>
            <Text>Welcome to search tab</Text>
        </View>
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
});
