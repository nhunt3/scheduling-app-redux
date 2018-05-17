import axios from 'axios';

export function fetchTimes() {
    const times = axios.get('/getTimes');

    return {
        type: 'FETCH_TIMES',
        payload: times
    };
}

export function editData(time, metadata) {
    axios.post('/editData', {"time": time});

    return{
        type: 'EDIT_DATA',
        time: time,
        metadata: metadata
    }
}