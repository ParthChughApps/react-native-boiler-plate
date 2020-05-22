import actionTypes from './actionTypes';

export function isLoggedIn(isUserLoggedIn) {
  return {
    type: actionTypes.UPDATE_LOGGED_IN,
    payload: isUserLoggedIn,
  };
}