import { LOG_IN } from "../constants/action-types";

const initialState = {
  username: null,
  messages: [],
  rooms: [],
  users: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, username: action.payload };
    default:
      return state;
  }
};

export default rootReducer;