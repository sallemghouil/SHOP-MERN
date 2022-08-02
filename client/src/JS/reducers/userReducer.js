import {
    GET_CURRENT_FAIL,
  GET_CURRENT_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "../constants/userConstants";

const initialState = {
  errors: null,
  currentUser: {},
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_SUCCESS:
      return { ...state, currentUser: payload };
    case REGISTER_FAIL:
      return { ...state, errors: payload };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return { ...state, currentUser: payload.user };
    case LOGIN_FAIL:
      return { ...state, errors: payload };
    case GET_CURRENT_SUCCESS:
      return { ...state, currentUser: payload };
    case GET_CURRENT_FAIL:
      return { ...state, errors: payload };
    case LOGOUT:
      localStorage.removeItem("token");
      return { errors: null, currentUser: {} };
    default:
      return state;
  }
};