import React from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";

import BooksContainer from "../Books/BooksContainer";

const WantToRead = ({ books }) => (
  <MediaQuery maxWidth={"28.125em"}>
    {matches => {
      if (matches) {
        return (
          <BooksContainer books={books} shelf={"Want to Read"} perPage={3} />
        );
      } else {
        return (
          <BooksContainer books={books} shelf={"Want to Read"} perPage={12} />
        );
      }
    }}
  </MediaQuery>
);
const mapStateToProps = state => ({
  books: state.books.filter(({ shelfStatus }) => shelfStatus === "Want to Read")
});

export default connect(mapStateToProps)(WantToRead);
