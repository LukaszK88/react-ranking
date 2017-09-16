import axios from 'axios';
import {API} from './index';
import {FETCH_ACHIEVEMENTS, FETCH_FIGHTERS, FETCH_LEADERBOARD, ADD_ACHIEVEMENT} from './types';

export function addAchievement(achievement) {
    return axios.post(`${API}achievement`,achievement).then(() => {
        return (dispatch) => {
            dispatch(fetchAchievements(achievement.user_id));
        }
    });

}

export function updateRanking(data,type) {
    return axios.post(`${API}fighters/${type}`,data).then(() => {
        return (dispatch) => {
            dispatch(fetchFighters());
        }
    });
}

export function fetchAchievements(userId) {
    const request = axios.get(`${API}achievement/${userId}`);

    return {
        type:FETCH_ACHIEVEMENTS,
        payload:request
    }
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
