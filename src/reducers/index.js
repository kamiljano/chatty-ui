import {
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_START,
  LOAD_SESSION_START,
  LOAD_SESSION_SUCCESS,
  LOAD_SESSION_FAILURE,
  LOAD_USERS_START,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  LOAD_CONVERSATION_START,
  LOAD_CONVERSATION_SUCCESS,
  LOAD_CONVERSATION_FAILURE,
  ADDED_USER, ADDED_MESSAGE, RECEIVED_MESSAGE
} from "../constants/action-types";

const initialState = {
  currentUser: null,
  messages: [],
  users: {
    loading: false,
    entries: [],
    error: null
  },
  selectedUser: null,
  loading: true,
  error: null,
};

const uniqueUsers = (state, newUser) => {
  return state.users.entries.some(user => user.username === newUser.username)
    ? state.users.entries
    : state.users.entries.concat([newUser]);
};

const updateUsersLastMessage = (entries, username, message) => {
  return entries.map(entry => {
    if (entry.username === username) {
      return {
        ...entry,
        lastMessage: message
      };
    }
    return {...entry};
  });
};

const processReceivedMessage = (state, payload) => {
  const messages = state.selectedUser && state.selectedUser.username === payload.from
    ? state.messages.concat([{
      from: payload.from,
      content: payload.body,
      to: '~'
    }])
    : state.messages;
  const result = {
    ...state,
    messages,
    users: {
      loading: false,
      error: null,
      entries: updateUsersLastMessage(state.users.entries, payload.from, payload.body)
    }
  };

  return result;
};

const processAddedMessage = (state, payload) => {
  const result = {
    ...state,
    users: {
      loading: false,
      error: null,
      entries: updateUsersLastMessage(state.users.entries, payload.to, payload.content)
    },
    messages: state.messages.concat([{
      from: '~',
      to: payload.to,
      content: payload.content
    }])
  };
  return result;
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_SUCCESS:
      return { ...state,
        currentUser: action.payload,
        error: null,
        loading: false
      };
    case LOG_IN_START:
      return {
        ...state,
        currentUser: null,
        loading: true,
        error: null
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        currentUser: null,
        loading: false,
        error: action.payload
      };
    case LOAD_SESSION_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOAD_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case LOAD_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case LOAD_USERS_START:
      return {
        ...state,
        users: {
          ...state.users,
          loading: true,
          error: null
        }
      };
    case LOAD_USERS_SUCCESS:
      return {
        ...state,
        users: {
          loading: false,
          entries: action.payload,
          error: null
        }
      };
    case LOAD_USERS_FAILURE:
      return {
        ...state,
        users: {
          loading: false,
          entries: [],
          error: action.payload
        }
      };
    case LOAD_CONVERSATION_START:
      return {
        ...state,
        messages: [],
        selectedUser: {
          username: action.payload.username,
          photo: action.payload.photo
        }
      };
    case LOAD_CONVERSATION_SUCCESS:
      return {
        ...state,
        messages: action.payload.map(load => ({
          from: load.from,
          to: load.to,
          content: load.message
        }))
      };
    case ADDED_USER:
      return {
        ...state,
        users: {
          loading: false,
          error: null,
          entries: uniqueUsers(state, action.payload)
        }
      };
    case RECEIVED_MESSAGE:
      return processReceivedMessage(state, action.payload);
    case ADDED_MESSAGE:
      return processAddedMessage(state, action.payload);
    default:
      return state;
  }
};

export default rootReducer;