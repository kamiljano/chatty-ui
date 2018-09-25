import {
  LOG_IN_START,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOAD_SESSION_START,
  LOAD_SESSION_SUCCESS,
  LOAD_SESSION_FAILURE,
  LOAD_USERS_START,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  LOAD_CONVERSATION_START,
  LOAD_CONVERSATION_SUCCESS,
  LOAD_CONVERSATION_FAILURE,
  ADDED_MESSAGE
} from "../constants/action-types";

import axios from 'axios';
import Socket from './Socket';

const BACKEND_URL = 'http://localhost:5555';
let socket;

const processLoginSuccess = (dispatch, username, photo) => {
  dispatch({type: LOG_IN_SUCCESS, payload: {username, photo}});
  socket = Socket.newSocket(BACKEND_URL, dispatch);
};

export function loadSession() {
  return async dispatch => {
    console.log('Loading session...');
    dispatch({type: LOAD_SESSION_START});
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/users/~`, {
        responseType: 'json',
        timeout: 3000,
        withCredentials: true
      });
      console.log(response);
      dispatch({type: LOAD_SESSION_SUCCESS});
      if (response.data && response.data.username) {
        processLoginSuccess(dispatch, response.data.username,  BACKEND_URL + response.data.photo);
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
        url: `${BACKEND_URL}/api/v1/users`,
        method: 'post',
        responseType: 'json',
        timeout: 3000,
        withCredentials: true,
        data: {username}
      });
      processLoginSuccess(dispatch, response.data.username,  BACKEND_URL + response.data.photo);
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
      const response = await axios.get(`${BACKEND_URL}/api/v1/users`, {
        responseType: 'json',
        timeout: 3000,
        withCredentials: true
      });
      console.log(response);
      const payload = response.data.map(user => ({
        ...user,
        photo: `${BACKEND_URL}${user.photo}`
      }));
      dispatch({type: LOAD_USERS_SUCCESS, payload});
    } catch (err) {
      console.error(err);
      dispatch({type: LOAD_USERS_FAILURE, payload: err});
    }
  };
}

export function selectUser(user) {
  return async dispatch => {
    dispatch({type: LOAD_CONVERSATION_START, payload: user});
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/users/${user.username}/conversations`, {
        responseType: 'json',
        timeout: 3000,
        withCredentials: true
      });
      dispatch({type: LOAD_CONVERSATION_SUCCESS, payload: response.data});
    } catch(err) {
      console.error(err);
      dispatch({type: LOAD_CONVERSATION_FAILURE, payload: err});
    }
  };
}

export function submitMessage(targetUsername, message) {
  return dispatch => {
    socket.sendMessage(targetUsername, message);
    dispatch({
      type: ADDED_MESSAGE,
      payload: {
        to: targetUsername,
        content: message
      }
    });
    loadUsers()(dispatch);
  };
}