import React from "react";
import { connect } from "react-redux";

import BooksContainer from "../Books/BooksContainer";

const CurrentlyReading = ({ books }) => (
  <BooksContainer
    books={books}
    shelf={"Currently Reading"}
    page={1}
    perPage={12}
    bunched={false}
  />
);

const mapStateToProps = state => ({
  books: state.books.filter(book => book.shelfStatus === "Currently Reading")
});

export default connect(mapStateToProps)(CurrentlyReading);
