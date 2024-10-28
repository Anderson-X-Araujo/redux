import store from "./store/configureStore.js";
import { tokenFetch } from "./store/token.js";
import { userFetch } from "./store/user.js";

const user = { username: "dog", password: "dog" };

const login = async (user_) => {
  let state = store.getState();

  if (state.token.data === null) {
    await store.dispatch(tokenFetch(user_));
  }

  state = store.getState();

  await store.dispatch(userFetch(state.token.data));
};

login(user);
