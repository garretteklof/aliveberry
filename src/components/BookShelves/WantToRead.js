import React from "react";
import { connect } from "react-redux";

import BooksContainer from "../Books/BooksContainer";

const WantToRead = ({ books }) => (
  <BooksContainer
    books={books}
    shelf={"Want to Read"}
    page={1}
    perPage={12}
    bunched={false}
  />
);
const mapStateToProps = state => ({
  books: state.books.filter(({ shelfStatus }) => shelfStatus === "Want to Read")
});

export default connect(mapStateToProps)(WantToRead);
