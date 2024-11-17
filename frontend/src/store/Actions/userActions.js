import axios from "axios";
import {
  CLEAR_ERROR,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from "../Constants/userConstants";

export const registerUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const { data } = await axios.post(
      `/api/v1/register`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });

    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: data,
    });

    localStorage.setItem("authToken", data.token);
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const loadToken = () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    return {
      type: LOGIN_USER_SUCCESS,
      payload: { token },
    };
  }
  return {
    type: LOGIN_USER_FAILURE,
  };
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
