import axios from 'axios';
import { API } from './index';
import { FETCH_USERS_ADMIN} from './types';
import {addFlashMessage} from './flashMessages';

export function fetchUsersAdmin() {
    const request = axios.get(`${API}admin`);

    return{
        type:FETCH_USERS_ADMIN,
        payload:request
    }
}
