import { ApiClient } from '@area/services';

import Cookies from 'universal-cookie';

const cookies = new Cookies();
export function getClient() {
    return new ApiClient({
        TOKEN: cookies.get('API_TOKEN'),
    });
}
