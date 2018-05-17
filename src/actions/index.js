import axios from 'axios';

export function fetchTimes() {
    const times = axios.get('/getTimes');

    return {
        type: 'FETCH_TIMES',
        payload: times
    };
}

export function editData(data) {
    const response = axios.post('/editData', data);

    return{
        type: 'EDIT_DATA',
        payload: response
    }
}