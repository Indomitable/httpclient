import { combineReducers } from 'redux';
import { RestReducer } from '../components/reducers';

export const appStateReducer = {
    rest: RestReducer
};

export default combineReducers(appStateReducer);
