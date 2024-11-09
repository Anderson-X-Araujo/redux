### Curso Redux com React Origamid

## Redux com React

Store, actions, reducer, imutabilidade, funções puras, middleware, @reduxjs/toolkit e react-redux

## Grade

- Redux com React
  Redux e Ferramentas

- Redux Básico
  Store, action, subscribe, reducer, funções pura, imutabilidade

- Middleware
  Currying, middleware, redux thunk, localStorage

- React Redux
  Connect, redux toolkit, async, createAsyncSlice, prepare

- Mais Redux
  Onde Utilizar, formulários, cache, selectors, filtros

- Projeto Redux
  Refatorar o projeto Dogs

## Resumo React Redux

## 1 - Instalar

```bash
npx create-react-app app
```

```bash
npm install redux react-redux @reduxjs/toolkit
```

## 2 - configureStore

```js
// /store/configureStore.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// reducer mínimo para teste
const contador = () => 0;

const reducer = combineReducers({ contador });
const store = configureStore({ reducer });

export default store;
```

## 3 - Provider

Adicionar a store ao aplicativo utilizando o `Provider` do `react-redux`.

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
```

## 4 - Reducer

Criar um Reducer, exportar o mesmo e importar no configureStore.

```js
// store/contador.js
import { createSlice } from "@reduxjs/toolkit";

// Se o initialState não for um Objeto ou Array,
// é necessário retornar o estado sem mutar o mesmo
const slice = createSlice({
  name: "contador",
  initialState: 0,
  reducers: {
    incrementar: (state) => state + 1,
    reduzir: (state) => state - 1,
  },
});

export const { incrementar, reduzir } = slice.actions;
export default slice.reducer;
```

```js
// store/configureStore.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import contador from "./contador";

const reducer = combineReducers({ contador });
const store = configureStore({ reducer });

export default store;
```

## 5 - useDispatch e useSelector

Utilizar a store criada dentro de um componente utilizando o `useSelector` para selecionar o estado e o `useDispatch` para despachar ações ao reducer.

```jsx
// Contador.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementar, reduzir } from "./store/contador";

const Contador = () => {
  const dispatch = useDispatch();
  const contador = useSelector((state) => state.contador);

  return (
    <div>
      <button onClick={() => dispatch(incrementar())}>+</button>
      <button onClick={() => dispatch(reduzir())}>-</button>
      <p>{contador}</p>
    </div>
  );
};

export default Contador;
```

## 6 - Middleware (opcional)

Criar um middleware para interferir em todas as ações que forem despachadas.

```js
// store/middleware/logger.js
const logger = (store) => (next) => (action) => {
  const result = next(action);
  console.log(result);
  return result;
};

export default logger;
```

```js
// store/configureStore.js
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import contador from "./contador";
import logger from "./middleware/logger";

// Adicionar o middleware desestruturando o padrão que já existe
const middleware = [...getDefaultMiddleware(), logger];
const reducer = combineReducers({ contador });
const store = configureStore({ reducer, middleware });

export default store;
```

## 7 - Ações Assíncronas com Thunk

```js
// store/fotos.js
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "fotos",
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    fetchStarted(state) {
      state.loading = true;
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchError(state, action) {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export default slice.reducer;

const { fetchStarted, fetchSuccess, fetchError } = slice.actions;

export const fetchFotos = (page) => async (dispatch) => {
  try {
    dispatch(fetchStarted());
    const response = await fetch(
      `https://dogsapi.origamid.dev/json/api/photo/?_page=${page}&_total=9&_user=0`,
      { cache: "no-store" },
    );
    const data = await response.json();
    dispatch(fetchSuccess(data));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};
```

```js
// store/configureStore.js
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import contador from "./contador";
import fotos from "./fotos";
import logger from "./middleware/logger";

const middleware = [...getDefaultMiddleware(), logger];
const reducer = combineReducers({ contador, fotos });
const store = configureStore({ reducer, middleware });

export default store;
```

```jsx
// Fotos.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFotos } from "./store/fotos";

const Fotos = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.fotos);

  React.useEffect(() => {
    dispatch(fetchFotos(1));
  }, [dispatch]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  if (data)
    return (
      <ul>
        {data.map((foto) => (
          <li key={foto.id}>{foto.title}</li>
        ))}
      </ul>
    );
  else return null;
};

export default Fotos;
```

## 8 - Seletores

Podemos definir seletores no arquivo do reducer para facilitar o uso de valores específicos da store

```js
// Selectors
export const selectOverFiveYears = (state) =>
  state.fotos.data?.filter(({ idade }) => idade > 5);
```

```js
// store/fotos.js
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "fotos",
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    fetchStarted(state) {
      state.loading = true;
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchError(state, action) {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export default slice.reducer;

const { fetchStarted, fetchSuccess, fetchError } = slice.actions;

export const fetchFotos = (page) => async (dispatch) => {
  try {
    dispatch(fetchStarted());
    const response = await fetch(
      `https://dogsapi.origamid.dev/json/api/photo/?_page=${page}&_total=9&_user=0`,
      { cache: "no-store" },
    );
    const data = await response.json();
    dispatch(fetchSuccess(data));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

// Selectors
export const selectOverFiveYears = (state) =>
  state.fotos.data?.filter(({ idade }) => idade > 5);
```

```jsx
// Fotos.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFotos, selectOverFiveYears } from "./store/fotos";

const Fotos = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.fotos);
  const fotos = useSelector(selectOverFiveYears);

  React.useEffect(() => {
    dispatch(fetchFotos(1));
  }, [dispatch]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  if (fotos)
    return (
      <ul>
        {fotos.map((foto) => (
          <li key={foto.id}>{foto.title}</li>
        ))}
      </ul>
    );
  else return null;
};

export default Fotos;
```
