import {
  CLEAR_ERROR,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from "../Constants/userConstants";

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
      return {
        loading: true,
        isRegistered: false,
        user: [],
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        loading: false,
        isRegistered: true,
        user: action.payload.user,
      };
    }
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };
    case CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }
    default:
      return state;
  }
};

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST: {
      return {
        loading: true,
        isAuthenticated: true,
        user: [],
      };
    }
    case LOGIN_USER_SUCCESS: {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    }
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loading: true,
        isAuthenticated: true,
        error: action.payload,
      };
    case CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }
    default:
      return state;
  }
};
