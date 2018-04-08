import React from "react";
import { connect } from "react-redux";

import Sidebar from "../Layout/Sidebar";
//move this
import Book from "../BookSearch/Book.js";

const CurrentlyReading = ({ books }) => (
  <div>
    {books.length ? (
      // divide Books
      books.map(book => <Book key={book.volumeID} book={book} />)
    ) : (
      <p> No Books </p>
    )}
  </div>
);

const mapStateToProps = state => ({
  books: state.books.filter(book => book.shelfStatus === "Currently Reading")
});

export default connect(mapStateToProps)(CurrentlyReading);
