import axios from 'axios';
import {API} from './index';
import {UPDATE_RANKING, FETCH_FIGHTERS, FETCH_LEADERBOARD} from './types';

export function updateRanking(data,type) {
    return axios.post(`${API}fighters/${type}`,data).then(() => {
        return (dispatch) => {
            dispatch(fetchFighters());
        }
    });
}

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