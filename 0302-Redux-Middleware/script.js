function reducer(state = 0, action) {
  console.log("reducer");

  switch (action.type) {
    case "INCREASE":
      return state + 1;

    case "DECREASE":
      return state - 1;

    default:
      return state;
  }
}

const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("ACTION: ", action);
  console.log("PREV STATE: ", store.getState());
  const result = next(action);
  console.log("NEW STATE: ", store.getState());
  console.groupEnd();

  return result;
  // return next(action);
};

const testMidd = (store) => (next) => (action) => {
  if (action.type === "DECREASE") window.alert("DECREASE");

  return next(action);
};

// const middleware = Redux.applyMiddleware(logger);

// Poderia passar o estado inicial pelo 'createStore', no caso o 0
// const store = Redux.createStore(reducer, 0);

// const store = Redux.createStore(reducer, middleware);

// console.log(store.getState());

const { applyMiddleware, compose } = Redux;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(logger, testMidd));

const store = Redux.createStore(reducer, enhancer);

store.dispatch({ type: "INCREASE" });
store.dispatch({ type: "INCREASE" });
store.dispatch({ type: "DECREASE" });

const test = store.dispatch({ type: "DECREASE" });
console.log(test);
