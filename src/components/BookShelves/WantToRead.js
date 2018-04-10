import React from "react";
import { connect } from "react-redux";

import BooksContainer from "../Books/BooksContainer";

const WantToRead = ({ books }) => (
  <BooksContainer books={books} shelf={"Want to Read"} perPage={12} />
);
const mapStateToProps = state => ({
  books: state.books.filter(({ shelfStatus }) => shelfStatus === "Want to Read")
});

export default connect(mapStateToProps)(WantToRead);
