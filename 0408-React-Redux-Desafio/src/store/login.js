import { combineReducers } from "@reduxjs/toolkit";
import createAsyncSlice from "./helper/createAsyncSlice";
import getLocalStorage from "./helper/getLocalStorage";
import { removePhotos } from "./photos";

const token = createAsyncSlice({
  name: "token",
  initialState: {
    data: {
      token: getLocalStorage("token", null),
    },
  },
  reducers: {
    removeToken(state) {
      state.data = null;
    },
    fetchSuccess: {
      reducer(state, action) {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      },
      prepare(payload) {
        return {
          payload,
          meta: {
            localStorage: {
              key: "token",
              value: payload.token,
            },
          },
        };
      },
    },
  },
  fetchConfig: (payload) => ({
    url: "https://dogsapi.origamid.dev/json/jwt-auth/v1/token",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  }),
});

const user = createAsyncSlice({
  name: "user",
  reducers: {
    removeUser(state) {
      state.data = null;
    },
  },
  fetchConfig: (payload) => ({
    url: "https://dogsapi.origamid.dev/json/api/user",
    options: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${payload}`,
      },
    },
  }),
});

const fetchToken = token.asyncAction;
const fetchUser = user.asyncAction;
const { removeToken } = token.actions;
const { removeUser } = user.actions;

const reducer = combineReducers({ token: token.reducer, user: user.reducer });

export default reducer;

export const login = (user) => async (dispatch) => {
  try {
    const { payload } = await dispatch(fetchToken(user));

    if (payload.token !== undefined) await dispatch(fetchUser(payload.token));
  } catch (error) {
    console.log(error.message);
  }
};

export const autoLogin = () => async (dispatch, getState) => {
  const state = getState();
  const { token } = state.login.token.data;

  if (token) await dispatch(fetchUser(token));
};

export const userLogout = () => (dispatch, getState) => {
  dispatch(removeUser());
  dispatch(removeToken());
  dispatch(removePhotos());

  window.localStorage.removeItem("token");
};
