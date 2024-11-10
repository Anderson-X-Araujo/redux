import { combineReducers, configureStore } from "@reduxjs/toolkit";
import photo from "./photo";
import token from "./token";
import user from "./user";
import feed from "./feed";
import ui from "./ui";
import photoPost from "./photoPost";

const reducer = combineReducers({ photo, token, user, feed, ui, photoPost });
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
