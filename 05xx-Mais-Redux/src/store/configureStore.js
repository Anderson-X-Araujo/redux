import { combineReducers, configureStore } from "@reduxjs/toolkit";
import date from "./date";
import photos from "./photos";
import products from "./products";

const reducer = combineReducers({ date, photos, products });

const store = configureStore({
  reducer,
});

export default store;
