import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
export const FETCH_FIGHTERS = 'FETCH_FIGHTERS';
export const FETCH_LEADERBOARD = 'FETCH_LEADERBOARD';
export const CURRENT_USER = 'CURRENT_USER';

export const API = 'http://whitecompany.com/api/';

export function fetchFighters() {
    const request = axios.get(`${API}fighters`);

    return {
        type:FETCH_FIGHTERS,
        payload:request
    }
}

export function fetchLeaderboard() {
    const request = axios.get(`${API}fighters-leaderboard`);

    return {
        type:FETCH_LEADERBOARD,
        payload:request
    }
}

export function logout() {
    return (dispatch) => {
        window.localStorage.removeItem('token');
        setAuthorizationToken(false);
        dispatch(currentUser(false));
    }
}

export function loginUser(user) {
    return axios.post(`${API}user/authenticate`,user).then((response) => {
        const {token} = response.data;
        window.localStorage.setItem('token',token);
        setAuthorizationToken(token);
        return (dispatch) => {
            dispatch(currentUser(token));
        }
    });
}

export function currentUser(token) {
    const request = axios.get(`${API}user-current`,{'Authorization': `Bearer ${token}`});

    return {
        type:CURRENT_USER,
        payload:request
    }
}
