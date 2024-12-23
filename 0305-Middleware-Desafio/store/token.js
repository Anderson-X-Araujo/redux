import getLocalStorage from "./helper/getLocalStorage.js";

// Constantes
const FETCH_STARTED = "token/FETCH_STARTED";
const FETCH_SUCCESS = "token/FETCH_SUCCESS";
const FETCH_ERROR = "token/FETCH_ERROR";

// Action Creators
const fetchStarted = () => ({ type: FETCH_STARTED });
const fetchSuccess = (payload) => ({
  type: FETCH_SUCCESS,
  payload,
  localStorage: "token",
});
const fetchError = (payload) => ({ type: FETCH_ERROR, payload });

// Estado Inicial
const initialState = {
  loading: false,
  data: getLocalStorage("token", null),
  error: null,
};

// ->
export const tokenFetch = (body) => async (dispatch, getState) => {
  try {
    dispatch(fetchStarted());

    const response = await fetch(
      "https://dogsapi.origamid.dev/json/jwt-auth/v1/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    const { token } = await response.json();

    dispatch(fetchSuccess(token));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

// Reducer
function token(state = initialState, action) {
  switch (action.type) {
    case "FETCH_STARTED":
      return { ...state, loading: true };

    case "FETCH_SUCCESS":
      return { loading: false, data: action.payload, error: null };

    case "FETCH_ERROR":
      return { loading: false, data: null, error: action.payload };

    default:
      return state;
  }
}

export default token;
