import actionTypes from './actionTypes';
import Config from "react-native-config";
import { cos } from 'react-native-reanimated';

export function isLoggedIn(isUserLoggedIn) {
  return {
    type: actionTypes.UPDATE_LOGGED_IN,
    payload: isUserLoggedIn,
  };
}

export function resetState() {
  return {
    type: actionTypes.RESET,
  };
}


export function updateResponse(response) {
  return {
    type: actionTypes.UPDATE_RESPONSE,
    payload: response,
  };
}

export function updateAddresses(response) {
  return {
    type: actionTypes.GET_USER_ADDRESSES,
    payload: response,
  };
}

export function updateUserDetails(response) {
  return {
    type: actionTypes.UPDATE_USER_DETAILS,
    payload: response,
  };
}


export function handleLocaleChange(locale) {
  return dispatch => {
    dispatch({type: actionTypes.CHOOSE_LOCALE, payload: locale});
  };
}

export function handleCoordinates(json) {
  return dispatch => {
    dispatch({type: actionTypes.UPDATE_COORDINATES, payload: json});
  };
}

export function updateOrgDetails(json) {
  return dispatch => {
    dispatch({type: actionTypes.UPDATE_ORG, payload: json});
  };
}

export function updateNearbyOrgs(json) {
  return dispatch => {
    dispatch({type: actionTypes.UPDATE_NEAR_BY_ORGS, payload: json});
  };
}

export function updateUserOrders(json) {
  return dispatch => {
    dispatch({type: actionTypes.UPDATE_USER_ORDERS, payload: json});
  };
}


export function signUpUser({data, callbackFunction}) {
  return (dispatch, getState) => {
    const {auth}  = getState()
    const newData = {
      email: data.email,
      locale: auth.get('locale'),
      password: data.password,
      phone_number: data.phone_number,
      name: data.name,
      extra_fields: { 
        "gst_number": data.gst_number, 
        "vehicle": data.vehicleTypes,
        "type": data.type
      },
      client_type: "fuel_gadi_customer_app"
    }
    return fetch(`${Config.BASE_URL}/api/v1/sign-up`, {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => {
        response.json().then(json => {
          if (response.status === 200) {
            dispatch(updateUserDetails(json));
            callbackFunction(json);
          } else {
            callbackFunction(json);
          }
        });
    });
  };
}

export function signInUser({data, callbackFunction}) {
  return (dispatch, getState) => {
    // const {auth}  = getState()
    const newData = {
      email: data.email,
      password: data.password,
    }
    return fetch(`${Config.BASE_URL}/api/v1/sign-in-email`, {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => {
      console.log("response", response);
      
        response.json().then(json => {
          if (response.status === 200) {
            dispatch(updateUserDetails(json));
            dispatch(isLoggedIn(true));
            callbackFunction(json, response.status);
          } else {
            dispatch(isLoggedIn(false));
            callbackFunction(json, response.status);
          }
        }).catch(error => {
          dispatch(isLoggedIn(false));
          callbackFunction({error: "Please confirm your email"}, 401);
        });
      
        
      
    });
  };
}

export function registerOrg({data, callbackFunction}) {
  return (dispatch, getState) => {
    const {auth}  = getState()
    const newData = {
      ...data,
      locale: auth.get('locale'),
      image: data.image.data
    }
    console.log("newData", newData)
    return fetch(`${Config.BASE_URL}/api/v1/register-org`, {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => {
        response.json().then(json => {
          if (response.status === 200) {
            dispatch(updateOrgDetails(json));
            callbackFunction(json, response.status);
          } else {
            callbackFunction(json, response.status);
          }
        });
    });
  };
}

export function getNearbyOrgs({data}) {
  return (dispatch, getState) => {
    const { auth }  = getState()
    console.log("---data---", data)
    return fetch(`${Config.BASE_URL}/api/v1/get-nearby-orgs?latitude=${data.location.latitude}&longitude=${data.location.longitude}&nearby_distance=${data.nearby_distance}&locale=${auth.get('locale')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => {
        response.json().then(json => {
          if (response.status === 200) {
            console.log(json);
            dispatch(updateNearbyOrgs(json));
          }
        });
    });
  };
}
export function signInPhone({data, callbackFunction}) {
  return (dispatch, getState) => {
    const {auth}  = getState()
    const newData = {
      ...data,
      locale: auth.get('locale'),
      appName: "fuel_gadi_customer_app",
      phone_number: data.mobile
    }
    console.log("newData", newData)
    return fetch(`${Config.BASE_URL}/api/v1/sign-in-phone`, {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => {
        response.json().then(json => {
          if (response.status === 200) {
            callbackFunction(json, response.status, data);
          } else {
            callbackFunction(json, response.status, data);
          }
        });
    });
  };
}
export function verifyOtp({data, callbackFunction}) {
  return (dispatch, getState) => {
    const {auth}  = getState()
    const newData = {
      ...data,
      locale: auth.get('locale'),
    }
    console.log("newData", newData)
    return fetch(`${Config.BASE_URL}/api/v1/verify-otp`, {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => {
        response.json().then(json => {
          if (response.status === 200) {
            callbackFunction(json, response.status);
            dispatch(updateUserDetails(json));
            dispatch(isLoggedIn(true))
          } else {
            callbackFunction(json, response.status);
            dispatch(isLoggedIn(false))
          }
        });
    });
  };
}

export function createAddress({data, callbackFunction}) {
  return (dispatch, getState) => {
    const {auth}  = getState()
    const newData = {
      ...data,
      locale: auth.get('locale'),
      zip_code: data.pincode
    }

    console.log("newData", newData)
    return fetch(`${Config.BASE_URL}/api/v1/create-address`, {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: {
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': `${auth.getIn([
          'userDetails',
          'user_auth_info',
          'token',
        ])}`,
      },
    }).then(response => {
        
        response.json().then(json => {
          console.log(json);
          if (response.status === 200) {
            callbackFunction(json, response.status);
          } else {
            callbackFunction(json, response.status); 
          }
        });
    });
  };
}

export function getUserAddresses() {
  return (dispatch, getState) => {
    const {auth}  = getState()
    return fetch(`${Config.BASE_URL}/api/v1/user-addresses?locale=${auth.get('locale')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': `${auth.getIn([
          'userDetails',
          'user_auth_info',
          'token',
        ])}`,
      },
    }).then(response => {
        response.json().then(json => {
          if (response.status === 200) {
            let data = {}
            json.addresses.forEach((el) => {
              data[el.id] = el
            })
            dispatch(updateAddresses(data))
          } else {
            dispatch(updateAddresses([]))
          }
        });
    });
  };
}

export function createOrder({data, callbackFunction}) {
  return (dispatch, getState) => {
    const {auth}  = getState()
    const newData = {
      ...data,
      locale: auth.get('locale'),
    }
    return fetch(`${Config.BASE_URL}/api/v1/place-order`, {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: {
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': `${auth.getIn([
          'userDetails',
          'user_auth_info',
          'token',
        ])}`,
      },
    }).then(response => {
        response.json().then(json => {
          if(response.status === 200) {
            callbackFunction(json, response.status); 
          } else {
            callbackFunction(json, response.status); 
          }
        });
    });
  };
}

export function getUserOrders() {
  return (dispatch, getState) => {
    const {auth}  = getState()
    console.log(`${auth.getIn([
      'userDetails',
      'user_auth_info',
      'token',
    ])}`)
    return fetch(`${Config.BASE_URL}/api/v1/user-orders?locale=${auth.get('locale')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': `${auth.getIn([
          'userDetails',
          'user_auth_info',
          'token',
        ])}`,
      },
    }).then(response => {
        response.json().then(json => {
          if(response.status === 200) {
            console.log("json::::", json)
            dispatch(updateUserOrders(json))
          }
        });
    });
  };
}