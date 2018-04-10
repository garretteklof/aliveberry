import React from "react";
import { connect } from "react-redux";

import BooksContainer from "../Books/BooksContainer";

const Read = ({ books }) => (
  <BooksContainer
    books={books}
    shelf={"Read"}
    page={1}
    perPage={12}
    bunched={false}
  />
);

const mapStateToProps = state => ({
  books: state.books.filter(({ shelfStatus }) => shelfStatus === "Read")
});

export default connect(mapStateToProps)(Read);
