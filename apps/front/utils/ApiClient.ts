import { ApiClient } from '@area/services';

import Cookies from 'universal-cookie';

export function getClient() {
    const cookies = new Cookies();
    const token = cookies.get('API_TOKEN');
    if (token) {
        return new ApiClient({
            TOKEN: cookies.get('API_TOKEN'),
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
