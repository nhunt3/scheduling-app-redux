import _ from 'lodash';

export default function(state = null, action) {
    switch (action.type) {
        case 'FETCH_TIMES':
            return _.mapKeys(action.payload.data, 'time');
        case 'EDIT_DATA':
            const newTimes = {...state};
            newTimes[action.payload.data.time].status = action.payload.data.status;
            newTimes[action.payload.data.time].name = action.payload.data.name;
            newTimes[action.payload.data.time].phone = action.payload.data.phone;
            return newTimes;
        default: return state;
    }
};