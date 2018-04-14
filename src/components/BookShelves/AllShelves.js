import React from "react";
import { connect } from "react-redux";

import BooksContainer from "../Books/BooksContainer";
import ScrollNotification from "./ScrollNotification";

const AllShelves = ({ rBooks, wtrBooks, crBooks }) => (
  <div className="all">
    <ScrollNotification />
    <BooksContainer books={rBooks} shelf={"Read"} perPage={8} bunched />
    <BooksContainer
      books={wtrBooks}
      shelf={"Want to Read"}
      perPage={8}
      bunched
    />
    <BooksContainer
      books={crBooks}
      shelf={"Currently Reading"}
      perPage={8}
      bunched
    />
  </div>
);

const mapStateToProps = state => ({
  rBooks: state.books.filter(({ shelfStatus }) => shelfStatus === "Read"),
  wtrBooks: state.books.filter(
    ({ shelfStatus }) => shelfStatus === "Want to Read"
  ),
  crBooks: state.books.filter(
    ({ shelfStatus }) => shelfStatus === "Currently Reading"
  )
});

export default connect(mapStateToProps)(AllShelves);
