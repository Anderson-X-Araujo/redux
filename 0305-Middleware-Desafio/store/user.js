// Constantes
const FETCH_STARTED = "user/FETCH_STARTED";
const FETCH_SUCCESS = "user/FETCH_SUCCESS";
const FETCH_ERROR = "user/FETCH_ERROR";

// Action Creators
const fetchStarted = () => ({ type: FETCH_STARTED });
export const fetchSuccess = (payload) => ({ type: FETCH_SUCCESS, payload });
const fetchError = (payload) => ({ type: FETCH_ERROR, payload });

// Estado Inicial
const initialState = {
  loading: false,
  data: null,
  error: null,
};

// ->
export const userFetch = (token) => async (dispatch, getState) => {
  try {
    dispatch(fetchStarted());

    const response = await fetch("https://dogsapi.origamid.dev/json/api/user", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data = await response.json();

    console.log("Hello World!", data);

    dispatch(fetchSuccess(data));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

// Reducer
function user(state = initialState, action) {
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

export default user;
