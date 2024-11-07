import { combineReducers, configureStore } from "@reduxjs/toolkit";
import date from "./date";
import photos from "./photos";

const reducer = combineReducers({ date, photos });

const store = configureStore({
  reducer,
});

export default store;
