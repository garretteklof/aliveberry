import React from "react";
import { Router, Switch } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import WelcomePage from "../components/Pages/WelcomePage";
import DashboardPage from "../components/Pages/DashboardPage";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";

export const history = createBrowserHistory();

export const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <PublicRoute exact path="/welcome" component={WelcomePage} />
      <PublicRoute exact path="/login" component={Login} />
      <PublicRoute exact path="/signup" component={SignUp} />
      <PrivateRoute path="/" component={DashboardPage} />
    </Switch>
  </Router>
);
