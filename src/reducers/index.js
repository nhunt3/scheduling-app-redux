import { combineReducers } from 'redux';
import timesReducer from './reducer_times';

const rootReducer = combineReducers({
    times: timesReducer
});

export default rootReducer;
