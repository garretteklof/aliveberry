import React from "react";

const Book = ({ thumbnailLink }) => (
  <a className="results__book">
    <img className="results__book-cover" src={thumbnailLink} alt="book cover" />
  </a>
);

export default Book;
