import React from "react";
import { connect } from "react-redux";

import BooksContainer from "../Books/BooksContainer";

const CurrentlyReading = ({ books }) => (
  <BooksContainer books={books} shelf={"Currently Reading"} perPage={12} />
);

const mapStateToProps = state => ({
  books: state.books.filter(book => book.shelfStatus === "Currently Reading")
});

export default connect(mapStateToProps)(CurrentlyReading);
