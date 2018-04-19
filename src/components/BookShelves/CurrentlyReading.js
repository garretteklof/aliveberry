import React from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";

import BooksContainer from "../Books/BooksContainer";

const CurrentlyReading = ({ books }) => (
  <MediaQuery maxWidth={"28.125em"}>
    {matches => {
      if (matches) {
        return (
          <BooksContainer
            books={books}
            shelf={"Currently Reading"}
            perPage={3}
          />
        );
      } else {
        return (
          <BooksContainer
            books={books}
            shelf={"Currently Reading"}
            perPage={12}
          />
        );
      }
    }}
  </MediaQuery>
);

const mapStateToProps = state => ({
  books: state.books.filter(book => book.shelfStatus === "Currently Reading")
});

export default connect(mapStateToProps)(CurrentlyReading);
