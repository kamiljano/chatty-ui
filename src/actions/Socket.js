import openSocket from 'socket.io-client';
import {ADDED_USER, RECEIVED_MESSAGE} from "../constants/action-types";
import {loadUsers} from './index';

const LABEL_PRIVATE_CHAT = 'privateChat';
const LABEL_NEW_USER = 'newUser';

const configureSocket = (url, dispatch, socket) => {
  socket.on(LABEL_PRIVATE_CHAT, data => {
    dispatch({
      type: RECEIVED_MESSAGE,
      payload: {
        from: data.from,
        body: data.body
      }
    });
    loadUsers()(dispatch);
  });

  socket.on(LABEL_NEW_USER, data => {
    dispatch({
      type: ADDED_USER,
      payload: {
        username: data.username,
        photo: url + data.photo
      }
    });
  });
};

export default class Socket {

  static newSocket(url, dispatch) {
    const socket = openSocket(url);
    configureSocket(url, dispatch, socket);
    return new Socket(socket);
  }

  constructor(socket) {
    this._socket = socket;
  }

  sendMessage(targetUsername, message) {
    this._socket.emit(LABEL_PRIVATE_CHAT, {
      target: targetUsername,
      body: message
    });
  }
}