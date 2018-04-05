import React from "react";

import Book from "./Book";

const BooksContainer = ({
  books,
  divideBooks,
  forward,
  backward,
  hideForward,
  hideBackward,
  page
}) => (
  <div className="results">
    {!!page && (
      <div className="results__grid">
        {books.length ? (
          divideBooks(books).map(book => (
            <Book key={book.volumeID} book={book} />
          ))
        ) : (
          <p> No Books </p>
        )}
        <div className="results__pagination">
          <a className={`${hideBackward()}`} onClick={backward}>
            <svg>
              <use xlinkHref="images/sprite.svg#icon-arrow-left-circle" />
            </svg>
          </a>
          <a className={`${hideForward()}`} onClick={forward}>
            <svg>
              <use xlinkHref="images/sprite.svg#icon-arrow-right-circle" />
            </svg>
          </a>
        </div>
      </div>
    )}
  </div>
);

export default BooksContainer;
