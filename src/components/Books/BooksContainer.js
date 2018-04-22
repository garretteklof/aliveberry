import React from "react";
import { Link } from "react-router-dom";
import Loader from "react-loaders";

import Book from "./Book";

export default class BooksContainer extends React.Component {
  state = {
    page: 1
  };

  divideBooks = books => {
    const indexLast = this.state.page * this.props.perPage;
    const indexFirst = indexLast - this.props.perPage;
    return books.slice(indexFirst, indexLast);
  };

  dropBooks = () => {
    const { books, loading, forSearch } = this.props;
    if (books.length) {
      return this.divideBooks(books).map(book => (
        <Book key={book.volumeID} book={book} forSearch={forSearch} />
      ));
    } else if (loading) {
      return <Loader type="ball-pulse-rise" />;
    } else if (forSearch) {
      return;
    } else {
      return (
        <div className="no-books">
          <p>No books on the shelf 😔</p>
          <Link to="/search">Find Book</Link>
        </div>
      );
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
    const lastPage = Math.ceil(this.props.books.length / this.props.perPage);
    if (this.state.page >= lastPage) {
      this.setState(() => ({ page: lastPage }));
    } else {
      this.setState(prevState => ({
        page: prevState.page + 1
      }));
    }
  };
  hidePaginateBackward = () => (this.state.page === 1 ? "u-hide" : "");
  hidePaginateForward = () => {
    const { books, perPage } = this.props;
    const { page } = this.state;
    if (
      this.divideBooks(books).length < perPage ||
      books.length === page * perPage
    ) {
      return "u-hide";
    }
    return "";
  };
  render() {
    const { books, shelf, bunched, forSearch, error } = this.props;
    return (
      <section className={forSearch ? "books" : "books u-marginless"}>
        {error && <p className="books__error">{error}</p>}
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
                  <use xlinkHref="/images/sprite.svg#icon-arrow-left-circle" />
                </svg>
              </a>
              <a
                className={`${this.hidePaginateForward()}`}
                onClick={this.paginateForward}
              >
                <svg>
                  <use xlinkHref="/images/sprite.svg#icon-arrow-right-circle" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </section>
    );
  }
}
