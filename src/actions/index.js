import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt_decode from 'jwt-decode';
export const FETCH_FIGHTERS = 'FETCH_FIGHTERS';
export const FETCH_LEADERBOARD = 'FETCH_LEADERBOARD';

export const LOGIN = 'LOGIN';
export const CURRENT_USER = 'CURRENT_USER';

const API = 'http://whitecompany.com/api/';

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

export function loginUser(user) {
    return axios.post(`${API}user/authenticate`,user).then((response) => {
        const {token} = response.data;
        window.localStorage.setItem('token',token);
        setAuthorizationToken(token);
        //console.log(jwt_decode(token));
        console.log('test');
        return (dispatch) => {
            console.log('disp');

            dispatch(currentUser(token));
        }
    });

    // return {
    //     type:LOGIN,
    //     payload:request
    // }
}

export function currentUser(token) {
    const request = axios.get(`${API}user-current`,{'Authorization': `Bearer ${token}`});
        console.log(request);
    return {
        type:CURRENT_USER,
        payload:request
    }
}
