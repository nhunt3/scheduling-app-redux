import _ from 'lodash';

export default function(state = null, action) {
    switch (action.type) {
        case 'FETCH_TIMES':
            return _.mapKeys(action.payload.data, 'time');
        case 'EDIT_DATA':
            const newTimes = {...state};
            newTimes[action.time].status = 'booked';
            newTimes[action.time].name = action.metadata.name;
            newTimes[action.time].phone = action.metadata.phone;
            return newTimes;
        default: return state;
    }
};