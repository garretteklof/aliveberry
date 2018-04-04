import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import Landing from "../components/Landing";
import Dashboard from "../components/Dashboard";
import NotFoundPage from "../components/NotFoundPage";

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <PublicRoute path="/" component={Landing} exact={true} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

export default AppRouter;
