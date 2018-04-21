import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Sidebar from "../Layout/Sidebar";
import BookSearch from "../BookSearch/";
import BookShelves from "../BookShelves/";

const DashboardPage = ({ match }) => (
  <div className="container">
    <Sidebar />
    <Switch>
      <Route path={`${match.path}search`} component={BookSearch} />
      <Route path={`${match.path}shelves`} component={BookShelves} />
      <Redirect to={`${match.url}shelves`} />
    </Switch>
  </div>
);

export default DashboardPage;
