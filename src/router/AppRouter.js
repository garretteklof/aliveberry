import React from "react";
import { Router, Switch } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import LoginPage from "../components/Pages/LoginPage";
import DashboardPage from "../components/Pages/DashboardPage";

export const history = createBrowserHistory();

export const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <PublicRoute exact path="/login" component={LoginPage} />
      <PrivateRoute path="/" component={DashboardPage} />
    </Switch>
  </Router>
);
