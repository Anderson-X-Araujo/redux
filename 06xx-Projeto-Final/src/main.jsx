import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import store from "./store/configureStore";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
