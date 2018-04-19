import React from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";

import BooksContainer from "../Books/BooksContainer";

const Read = ({ books }) => (
  <MediaQuery maxWidth={"28.125em"}>
    {matches => {
      if (matches) {
        return <BooksContainer books={books} shelf={"Read"} perPage={3} />;
      } else {
        return <BooksContainer books={books} shelf={"Read"} perPage={12} />;
      }
    }}
  </MediaQuery>
);

const mapStateToProps = state => ({
  books: state.books.filter(({ shelfStatus }) => shelfStatus === "Read")
});

export default connect(mapStateToProps)(Read);
