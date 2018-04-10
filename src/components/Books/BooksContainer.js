import React from "react";
import { Link } from "react-router-dom";

import Book from "./Book";

class BooksContainer extends React.Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      page: props.page ? props.page : 0
    };
    this.state = this.defaultState;
  }
  divideBooks = books => {
    const indexLast = this.state.page * this.props.perPage;
    const indexFirst = indexLast - this.props.perPage;
    return books.slice(indexFirst, indexLast);
  };

  dropBooks = () => {
    const { books } = this.props;
    if (books.length) {
      return this.divideBooks(books).map(book => (
        <Book key={book.volumeID} book={book} />
      ));
    } else {
      return <p> No Books </p>;
    }
  };
  paginateBackward = () => {
    if (this.state.page <= 1) {
      this.setState(() => ({ page: 1 }));
    } else {
      this.setState(prevState => ({
        page: prevState.page - 1
      }));
    }
  };
  paginateForward = () => {
    if (this.state.page >= 3) {
      this.setState(() => ({ page: 3 }));
    } else {
      this.setState(prevState => ({
        page: prevState.page + 1
      }));
    }
  };
  hidePaginateBackward = () => (this.state.page === 1 ? "u-hide" : "");
  hidePaginateForward = () => {
    if (
      this.divideBooks(this.props.books).length < this.props.perPage ||
      this.state.page === 3
    ) {
      return "u-hide";
    }
    return "";
  };
  render() {
    const { books, shelf, bunched } = this.props;
    return (
      <section className="books">
        {!!this.state.page && (
          <div className={bunched ? "books__grid--bunched" : "books__grid"}>
            {!!shelf &&
              (bunched ? (
                <Link
                  to={`/shelves/${shelf.replace(/\s+/g, "-").toLowerCase()}`}
                  className="books__heading"
                >
                  {shelf}
                </Link>
              ) : (
                <span className="books__heading">{shelf}</span>
              ))}
            {bunched && <div className="books__wrap">{this.dropBooks()}</div>}
            {!bunched && this.dropBooks()}
            <div className="books__pagination">
              <a
                className={`${this.hidePaginateBackward()}`}
                onClick={this.paginateBackward}
              >
                <svg>
                  <use href="/images/sprite.svg#icon-arrow-left-circle" />
                </svg>
              </a>
              <a
                className={`${this.hidePaginateForward()}`}
                onClick={this.paginateForward}
              >
                <svg>
                  <use href="/images/sprite.svg#icon-arrow-right-circle" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default BooksContainer;
