const urlApi = "https://pokeapi.co/api/v2/pokemon/";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

function reducer(state = initialState, action) {
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

const thunk = (store) => (next) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch, store.getState);
  }

  return next(action);
};

const { applyMiddleware, compose } = Redux;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = Redux.createStore(reducer, enhancer);

// Método Inicial (funciona, mas não é o adequado) ->
// async function fetchURL(dispatch, url) {
//   try {
//     dispatch({ type: "FETCH_STARTED" });

//     const data = await fetch(url);
//     const json = await data.json();

//     dispatch({ type: "FETCH_SUCCESS", payload: json });
//   } catch (error) {
//     dispatch({ type: "FETCH_ERROR", payload: error.message });
//   }
// }

// fetchURL(store.dispatch, urlApi);

function increase() {
  return { type: "INCREASE" };
}

function fetchURL(url) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "FETCH_STARTED" });

      const data = await fetch(url);
      const json = await data.json();

      dispatch({ type: "FETCH_SUCCESS", payload: json });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };
}

store.dispatch(fetchURL(urlApi));
store.dispatch(increase()); // Só como exemplo
