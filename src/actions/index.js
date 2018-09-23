import {
  LOG_IN_START,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOAD_SESSION_START,
  LOAD_SESSION_SUCCESS,
  LOAD_SESSION_FAILURE,
  LOAD_USERS_START,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE
} from "../constants/action-types";

import axios from 'axios';

export function loadSession() {
  return async dispatch => {
    console.log('Loading session...');
    dispatch({type: LOAD_SESSION_START});
    try {
      const response = await axios.get('http://localhost:5555/api/v1/users/~', {
        responseType: 'json',
        timeout: 3000,
        withCredentials: true
      });
      console.log(response);
      dispatch({type: LOAD_SESSION_SUCCESS});
      if (response.data && response.data.username) {
        dispatch({type: LOG_IN_SUCCESS, payload: {
          username: response.data.username,
          photo: 'http://localhost:5555' + response.data.photo
        }});
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
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
      const response = await  axios({
        url: 'http://localhost:5555/api/v1/users',
        method: 'post',
        responseType: 'json',
        timeout: 3000,
        withCredentials: true,
        data: {username}
      });
      dispatch({type: LOG_IN_SUCCESS, payload: {
        username: response.data.username,
        photo: 'http://localhost:5555' + response.data.photo
      }});
    } catch (err) {
      console.error(err);
      dispatch({type: LOG_IN_FAILURE, payload: err});
    }
  };
}

export function loadUsers() {
  return async dispatch => {
    dispatch({type: LOAD_USERS_START});
    try {
      const response = await axios.get('http://localhost:5555/api/v1/users', {
        responseType: 'json',
        timeout: 3000,
        withCredentials: true
      });
      console.log(response);
      const payload = response.data.map(user => ({
        ...user,
        photo: `http://localhost:5555${user.photo}`
      }));
      dispatch({type: LOAD_USERS_SUCCESS, payload});
    } catch (err) {
      console.error(err);
      dispatch({type: LOAD_USERS_FAILURE, payload: err});
    }
  };
}