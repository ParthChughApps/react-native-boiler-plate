import actionTypes from './actionTypes';
import Config from "react-native-config";

export function updateLocales(json) {
  return {
    type: actionTypes.UPDATE_LOCALES,
    payload: json,
  };
}


export function getLocales() {
  return (dispatch, getState) => {
    console.log(`${Config.BASE_URL}/api/v1/get-locales`);
    return fetch(`${Config.BASE_URL}/api/v1/get-locales`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => {
      if (response.status === 200) {
        response.json().then(json => {
          dispatch(updateLocales(json));
        });
      }
    });
  };
}