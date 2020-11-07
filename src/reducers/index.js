import {combineReducers} from 'redux';
import authReducer from '../reducers/authReducer.js';

export const rootReducer = combineReducers({  
  auth: authReducer,
});
