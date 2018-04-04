import React from "react";

import Book from "./Book";

const testBook = {
  volumeID: "123",
  title:
    "Harry Potter Harry Potter! :Harr asd:Potter! Harry Potter! Harry Potter! Harry asdasd Potter!  asd:Potter! Harry Potter! Harry Potter! Harry asdasd Potter!",
  title: "harry potter and the prisoner of azkaban",
  subtitle:
    "Harry Potter and yo momma drama bab bab asdb asd basdsdady ma drama bab ba ma drama bab ba ma drama bab ba",
  authors: ["Yo momma", "Yo daddy"],
  description:
    "This is a very long description about life. This is a very long description about life. This is a very long description about life This is a very long description about life. This is a very long description about life. This is a very long description about life This is a very long description about life This is a very long description about life. Who knows who your daddy is? Who could ever know? Could life be the matrix? Or is it a matrice? Who knows? Nobody knows.",
  identifiers: [{ type: "ISBN_10", identifier: "1234567810" }],
  pageCount: 356,
  thumbnailLink:
    "http://books.google.com/books/content?id=20qxCDW8tbAC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
};
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
    {/* {!!page && (
      <div className="results__grid">
        {books.length ? (
          divideBooks(books).map(book => <Book key={book.volumeID} {...book} />)
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
    )} */}
    <Book {...testBook} />
  </div>
);

export default BooksContainer;
