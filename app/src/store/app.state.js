import { combineReducers } from 'redux';
import { RestReducer } from '../components/reducers';

export const appStateReducer = {
    restCall: RestReducer
};

export default combineReducers(appStateReducer);
