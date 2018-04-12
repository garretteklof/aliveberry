import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import axios from "axios";

import { AppRouter, history } from "./router/AppRouter";

import { login, logout } from "./actions/auth";
import { beginSetBooks } from "./actions/books";

import "./styles/styles.scss";

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

/*** Automatic Returning Login ***/

(async () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const currentUser = await axios.get("/users/me", {
        headers: { "x-auth": token }
      });
      store.dispatch(login(currentUser.data));
      await store.dispatch(beginSetBooks());
      renderApp();
      history.push("/");
    } catch (e) {
      localStorage.removeItem("token");
      store.dispatch(logout());
      renderApp();
      history.push("/welcome");
    }
  } else {
    renderApp();
    history.push("/welcome");
  }
})();

/** ReactDOM.render(<Loading/>, document.getElementById("app")); **/
