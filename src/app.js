import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import axios from "axios";

import AppRouter, { history } from "./routes/AppRouter";
import configureStore from "./store/configureStore";
import { login, logout } from "./actions/auth";

import "./styles/styles.scss";
import { beginSetBooks } from "./actions/books";

const store = configureStore();

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(app, document.getElementById("app"));
    hasRendered = true;
  }
};

(async () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const currentUser = await axios.get("/users/me", {
        headers: { "x-auth": token }
      });
      store.dispatch(login(currentUser.data._id));
      await store.dispatch(beginSetBooks());
      renderApp();
      history.push("/dashboard");
    } catch (e) {
      store.dispatch(logout());
      renderApp();
      history.push("/");
    }
  }
})();

/** ReactDOM.render(<Loading/>, document.getElementById("app")); **/
