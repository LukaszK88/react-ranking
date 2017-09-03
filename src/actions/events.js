import axios from 'axios';
import { API } from './index';
import { FETCH_EVENTS } from './types';

export function fetchEvents() {
    const request = axios.get(`${API}event`);

    return {
        type:FETCH_EVENTS,
        payload:request
    }
}