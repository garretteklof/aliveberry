import React from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";

import WantToRead from "./WantToRead";
import CurrentlyReading from "./CurrentlyReading";
import Read from "./Read";

const BookShelves = ({ match }) => (
  <main className="book-shelves__container">
    <Switch>
      <Route path={`${match.path}/read`} component={Read} />
      <Route path={`${match.path}/want-to-read`} component={WantToRead} />
      <Route
        path={`${match.path}/currently-reading`}
        component={CurrentlyReading}
      />
    </Switch>
  </main>
);

export default BookShelves;
