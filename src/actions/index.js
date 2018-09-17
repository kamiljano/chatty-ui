import { LOG_IN } from "../constants/action-types";

export const logIn = username => ({ type: LOG_IN, payload: username });
export const logOut = () => ({ type: LOG_IN, payload: null});