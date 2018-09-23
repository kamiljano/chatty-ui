import {
  LOG_IN_START,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOAD_SESSION_START,
  LOAD_SESSION_SUCCESS,
  LOAD_SESSION_FAILURE
} from "../constants/action-types";

import axios from 'axios';

export function loadSession() {
  return async dispatch => {
    console.log('Loading session...');
    dispatch({type: LOAD_SESSION_START});
    try {
      const response = await axios.get('http://localhost:5555/api/v1/users/~', {
        responseType: 'json',
        timeout: 3000
      });
      console.log(response);
      dispatch({type: LOAD_SESSION_SUCCESS});
      if (response.username) {
        dispatch({type: LOG_IN_SUCCESS, payload: response.username});
      }
    } catch (err) {
      if (err.response.status === 401) {
        console.log('User not logged in');
        dispatch({type: LOAD_SESSION_SUCCESS});
        dispatch({type: LOG_IN_SUCCESS, payload: null});
        return;
      }
      console.error(err);
      dispatch({type: LOAD_SESSION_FAILURE, payload: err});
    }
  };
}

export function logIn(username) {
  return async dispatch => {
    console.log(`Logging in as "${username}"...`);
    dispatch({type: LOG_IN_START});
    try {
      await  axios.post('http://localhost:5555/api/v1/users', {username});
      dispatch({type: LOG_IN_SUCCESS, payload: username});
    } catch (err) {
      console.error(err);
      dispatch({type: LOG_IN_FAILURE, payload: err});
    }
  };
}