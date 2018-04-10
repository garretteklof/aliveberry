import React from "react";
import { Switch, Route } from "react-router-dom";

import AllShelves from "./AllShelves";
import Read from "./Read";
import WantToRead from "./WantToRead";
import CurrentlyReading from "./CurrentlyReading";

const BookShelves = ({ match }) => (
  <main className="book-shelves">
    <Switch>
      <Route exact path={`${match.path}`} component={AllShelves} />
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
