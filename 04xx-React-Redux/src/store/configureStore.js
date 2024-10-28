import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counter from "./counter";
import modal from "./modal";
import login from "./login";
import logger from "./middleware/logger";
import localStorage from "./middleware/localStorage";

const reducer = combineReducers({
  counter,
  modal,
  login,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger).concat(localStorage),
});

export default store;
