import {
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_START,
  LOAD_SESSION_START,
  LOAD_SESSION_SUCCESS,
  LOAD_SESSION_FAILURE
} from "../constants/action-types";

const initialState = {
  username: null,
  messages: [],
  rooms: [],
  users: [],
  loading: true,
  error: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_SUCCESS:
      return { ...state,
        username: action.payload,
        error: null,
        loading: false
      };
    case LOG_IN_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
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
    default:
      return state;
  }
};

export default rootReducer;