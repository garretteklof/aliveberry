import React from "react";
import { connect } from "react-redux";

import BooksContainer from "../Books/BooksContainer";

const AllShelves = ({ rBooks, wtrBooks, crBooks }) => (
  <div className="all">
    <BooksContainer
      books={rBooks}
      shelf={"Read"}
      page={1}
      perPage={8}
      bunched={true}
    />
    <BooksContainer
      books={wtrBooks}
      shelf={"Want to Read"}
      page={1}
      perPage={8}
      bunched={true}
    />
    <BooksContainer
      books={crBooks}
      shelf={"Currently Reading"}
      page={1}
      perPage={8}
      bunched={true}
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
