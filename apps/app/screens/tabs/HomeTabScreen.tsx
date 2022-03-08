import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { RootStackParamList } from '../../types';
import { ThemeContext } from '../../constants/ThemeContext';
import Icon from 'react-native-vector-icons/Octicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { Service } from '../../../../packages/services';
// import { getClient } from '../../utils/ApiClient';
// import { ArtistWidget } from '../../../../packages/ui/Widgets/ArtistWidget';

type Props = NativeStackScreenProps<RootStackParamList, 'AccountsModal'>;

export default function HomeTabScreen({ navigation }: Props) {
    const { theme } = useContext(ThemeContext);

    // const test = () => {
    //     console.log('oui oui baguette');
    // };
    //
    // const [userServices, setUserServices] = useState<Service[]>([]);
    // const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     getClient()
    //         .services.getAllUserServices()
    //         .then((services) => setUserServices(services.services as Service[]))
    //         .then(() => setLoading(true));
    // }, []);

    return (
        <View style={{ backgroundColor: theme.primary }}>
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
                {/*{loading ? (*/}
                {/*    <ArtistWidget*/}
                {/*        deleteWidget={test}*/}
                {/*        widgetKey={1}*/}
                {/*        widgetService={userServices[0].id}*/}
                {/*        clientAPi={getClient}*/}
                {/*        handleArtistListClick={() => console.log('wallah')}*/}
                {/*    />*/}
                {/*) : (*/}
                {/*    <ActivityIndicator />*/}
                {/*)}*/}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    primaryContainer: {
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
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
