import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  addAndRemoveReducer,
  createTripReducer,
  getAllTripsReducer,
  getSelectedTripsReducer,
  setCurrentTripReducer,
} from "./Reducers/tripReducers";
import { thunk } from "redux-thunk";
import { loginReducer, registerReducer } from "./Reducers/userReducer";

const initialState = {};

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  newTrip: createTripReducer,
  allTrips: getAllTripsReducer,
  isSelectedTrip: addAndRemoveReducer,
  selectedTrips: getSelectedTripsReducer,
  trip: setCurrentTripReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: true,
    }).concat(thunk),
});
