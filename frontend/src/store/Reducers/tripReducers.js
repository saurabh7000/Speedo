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

export const createTripReducer = (state = { trip: {} }, action) => {
  switch (action.type) {
    case CREATE_TRIP_REQUEST: {
      return {
        loading: true,
        isTripCreated: false,
        trip: {},
      };
    }
    case CREATE_TRIP_SUCCESS: {
      return {
        loading: false,
        isTripCreated: true,
        trip: action.payload.trip,
      };
    }
    case CREATE_TRIP_FAILURE: {
      return {
        loading: true,
        isTripCreated: false,
        error: action.payload,
      };
    }
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

export const getAllTripsReducer = (state = { trips: [] }, action) => {
  switch (action.type) {
    case ALL_TRIPS_REQUEST: {
      return {
        loading: true,
        totalTrips: 0,
        trips: [],
      };
    }
    case ALL_TRIPS_SUCCESS: {
      return {
        loading: false,
        totalTrips: action.payload.totalTrips,
        trips: action.payload.trips,
      };
    }
    case ALL_TRIPS_FAILURE: {
      return {
        loading: true,
        error: action.payload,
      };
    }
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

export const getSelectedTripsReducer = (state = { trips: [] }, action) => {
  switch (action.type) {
    case TRIP_DETAIL_REQUEST: {
      return {
        loading: true,
        totalTrips: 0,
        trips: [],
      };
    }
    case TRIP_DETAIL_SUCCESS: {
      return {
        loading: false,
        totalTrips: action.payload.totalTrips,
        trips: action.payload.trips,
      };
    }
    case TRIP_DETAIL_FAILURE: {
      return {
        loading: true,
        error: action.payload,
      };
    }
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

export const deleteTripsReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TRIPS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_TRIPS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_TRIPS_FAILURE:
      return {
        ...state,
        loading: false,
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

export const addAndRemoveReducer = (state = { isSelected: [] }, action) => {
  switch (action.type) {
    case ADD_TRIP: {
      return {
        ...state,
        isSelected: [...state.isSelected, action.payload],
      };
    }

    case REMOVE_TRIP: {
      return {
        ...state,
        isSelected: state.isSelected.filter((trip) => trip !== action.payload),
      };
    }

    default:
      return state;
  }
};

export const setCurrentTripReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_TRIP: {
      return {
        ...state,
        trip: action.payload,
      };
    }
    default:
      return state;
  }
};
