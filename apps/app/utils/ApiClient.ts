import { ApiClient } from '../../../packages/services';
import localStorage from 'react-native-sync-localstorage';

export function getClient() {
    const token = localStorage.getItem('API_TOKEN');
    if (token) {
        return new ApiClient({
            TOKEN: token,
            HEADERS: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        return new ApiClient();
    }
}
