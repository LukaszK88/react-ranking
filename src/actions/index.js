import axios from 'axios';

export const FETCH_FIGHTERS = 'FETCH_FIGHTERS';
export const FETCH_LEADERBOARD = 'FETCH_LEADERBOARD';
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
