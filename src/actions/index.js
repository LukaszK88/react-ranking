import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import {FETCH_USER,UPDATE_USER} from './types';
import {addFlashMessage} from './flashMessages';

export const CURRENT_USER = 'CURRENT_USER';
export const API = 'http://whitecompany.com/api/';

export function logout() {
    return (dispatch) => {
        window.localStorage.removeItem('token');
        setAuthorizationToken(false);
        dispatch(currentUser(null));
        dispatch(addFlashMessage('error', 'Logging out...'));
    }
}

export function updateUser(data) {
    const request = axios.put(`${API}user-update`,data);

    return {
        type:UPDATE_USER,
        payload:request
    }
}

export function fetchUser(userId) {
    const request = axios.get(`${API}fighters/${userId}`);

    return {
        type:FETCH_USER,
        payload:request
    }
}

export function uploadProfileImage(userId,image) {
    return (dispatch) => { dispatch(axios.post(`${API}storePhoto/${userId}`,{file:image}) )};
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

export function registerUser(data) {
    return (dispatch) => { dispatch(axios.post(`${API}user-store`,data) )};
}

export function loginWithFacebook(data) {
    return axios.post(`${API}login-facebook`,data).then((response) => {
        const {token, message} = response.data;
        window.localStorage.setItem('token',token);
        setAuthorizationToken(token);

        return (dispatch) => {
            dispatch(currentUser(token));
            dispatch(addFlashMessage('success', message));
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
