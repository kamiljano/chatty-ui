import {
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_START,
  LOAD_SESSION_START,
  LOAD_SESSION_SUCCESS,
  LOAD_SESSION_FAILURE,
  LOAD_USERS_START,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE
} from "../constants/action-types";

const initialState = {
  currentUser: null,
  messages: [],
  rooms: [],
  users: {
    loading: false,
    entries: [],
    error: null
  },
  loading: true,
  error: null,
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
    default:
      return state;
  }
};

export default rootReducer;