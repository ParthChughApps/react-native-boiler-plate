import {fromJS} from 'immutable';
import actionTypes from '../actions/actionTypes';

const INIT_STATE = {
  userLoggedIn: false,
};
const auth = (state = fromJS(INIT_STATE), action) => {
  switch (action.type) {
    case actionTypes.UPDATE_LOGGED_IN:
      return state.merge({
        userLoggedIn: fromJS(action.payload),
      });
    default:
      return state;     
  }  
};

export default auth;