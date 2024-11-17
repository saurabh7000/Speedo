import axios from "axios";
import {
  ADD_TRIP,
  ALL_TRIPS_FAILURE,
  ALL_TRIPS_REQUEST,
  ALL_TRIPS_SUCCESS,
  CLEAR_ERROR,
  CREATE_TRIP_FAILURE,
  CREATE_TRIP_REQUEST,
  CREATE_TRIP_SUCCESS,
  DELETE_TRIPS_FAILURE,
  DELETE_TRIPS_REQUEST,
  DELETE_TRIPS_SUCCESS,
  REMOVE_TRIP,
  SET_CURRENT_TRIP,
  TRIP_DETAIL_FAILURE,
  TRIP_DETAIL_REQUEST,
  TRIP_DETAIL_SUCCESS,
} from "../Constants/tripConstants";

export const uploadTrip = (tripName, tripDetail) => async (dispatch) => {
  try {
    const form = new FormData();
    form.append("tripName", tripName);
    form.append("file", tripDetail);

    dispatch({ type: CREATE_TRIP_REQUEST });

    const { data } = await axios.post(`/api/v1/createtrip`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch({
      type: CREATE_TRIP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_TRIP_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const getAllTrips = (page) => async (dispatch) => {
  try {
    dispatch({ type: ALL_TRIPS_REQUEST });

    const { data } = await axios.get(`/api/v1/alltrips?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: ALL_TRIPS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error.response.data.message);

    dispatch({
      type: ALL_TRIPS_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const tripDetails = (tripsId) => async (dispatch) => {
  try {
    dispatch({ type: TRIP_DETAIL_REQUEST });

    const { data } = await axios.post("/api/v1/trips/detail", {
      tripsId,
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: TRIP_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRIP_DETAIL_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const deleteTrips = (tripsId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TRIPS_REQUEST });

    const { data } = await axios.delete("/api/v1/delete/trips", {
      data: { tripsId },
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: DELETE_TRIPS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TRIPS_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const addTrip = (tripId) => (dispatch) => {
  dispatch({
    type: ADD_TRIP,
    payload: tripId,
  });
};

export const removeTrip = (tripId) => (dispatch) => {
  dispatch({
    type: REMOVE_TRIP,
    payload: tripId,
  });
};

export const setCurrentTrip = (trip) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT_TRIP,
    payload: trip,
  });
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
