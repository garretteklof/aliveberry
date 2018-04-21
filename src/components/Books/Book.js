import React from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import {
  beginAddBook,
  beginDeleteBook,
  beginEditBook
} from "../../actions/books";

Modal.setAppElement("#app");

class Book extends React.Component {
  state = {
    showModal: false,
    shelf: this.props.book.shelfStatus
      ? this.props.book.shelfStatus
      : "Want to Read"
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };
  handleCloseModal = () => {
    this.setState({ showModal: false });
  };
  onShelfChange = e => {
    const shelf = e.target.value;
    this.setState({ shelf }, () => this.editBook());
  };

  addBook = async () => {
    const book = Object.assign({}, this.props.book, {
      shelfStatus: this.state.shelf
    });
    try {
      await this.props.beginAddBook(book);
      this.handleCloseModal();
    } catch (e) {
      // SET ERROR
    }
  };

  deleteBook = async () => {
    try {
      await this.props.beginDeleteBook(this.props.book);
    } catch (e) {
      // SET ERROR
    }
  };

  editBook = async () => {
    const book = { ...this.props.book, shelfStatus: this.state.shelf };
    try {
      await this.props.beginEditBook(book);
    } catch (e) {}
  };

  render() {
    const { forSearch } = this.props;
    const {
      thumbnailLink,
      identifiers,
      title,
      subtitle,
      authors,
      pageCount,
      description
    } = this.props.book;
    return (
      <div className="books__book">
        <a onClick={this.handleOpenModal}>
          <img
            className="books__book-cover"
            src={thumbnailLink}
            alt="book cover"
          />
        </a>
        <Modal
          contentLabel="Book Modal"
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          className="book-modal"
          overlayClassName="book-overlay"
        >
          <a className="book-modal__close" onClick={this.handleCloseModal}>
            <svg>
              <use xlinkHref="/images/sprite.svg#icon-x-circle" />
            </svg>
          </a>
          <div className="book-modal__grid">
            <img
              className="book-modal__book-cover"
              src={thumbnailLink}
              alt="book cover"
            />
            <div className="book-modal__book-info">
              <svg>
                <use xlinkHref="/images/sprite.svg#icon-book" />
              </svg>
              <div
                className={`book-modal__book-titles ${
                  title.length > 50 ? "book-modal__book-titles--reduce" : ""
                }`}
              >
                <p>{title}</p>
                <p>{subtitle}</p>
              </div>
              <svg>
                <use xlinkHref="/images/sprite.svg#icon-authors" />
              </svg>
              <p>{authors ? authors.join(", ") : "No author information."}</p>
              <svg>
                <use xlinkHref="/images/sprite.svg#icon-book-open" />
              </svg>
              <p>{pageCount ? `${pageCount} pages` : "No page information."}</p>
              <svg>
                <use xlinkHref="/images/sprite.svg#icon-hash" />
              </svg>
              <p>
                {identifiers.length
                  ? identifiers[0].identifier
                  : "No ISBN or other identifying information."}
              </p>
            </div>
            <MediaQuery maxWidth={"43.75em"}>
              {matches => {
                if (matches) {
                  return (
                    <p className="book-modal__book-description">
                      {description.length > 200
                        ? description.slice(0, 200) + " ..."
                        : description}
                    </p>
                  );
                } else {
                  return (
                    <p className="book-modal__book-description">
                      {description.length > 400
                        ? description.slice(0, 400) + " ..."
                        : description}
                    </p>
                  );
                }
              }}
            </MediaQuery>
            <select
              className="book-modal__select"
              value={this.state.shelf}
              onChange={this.onShelfChange}
            >
              <option value="Read">Read</option>
              <option value="Want to Read">Want to Read</option>
              <option value="Currently Reading">Currently Reading</option>
            </select>
            {forSearch ? (
              <a className="book-modal__submit" onClick={this.addBook}>
                <svg>
                  <use xlinkHref="/images/sprite.svg#icon-check-circle" />
                </svg>
              </a>
            ) : (
              <a className="book-modal__delete" onClick={this.deleteBook}>
                <svg>
                  <use xlinkHref="/images/sprite.svg#icon-trash" />
                </svg>
              </a>
            )}
          </div>
        </Modal>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  beginAddBook: book => dispatch(beginAddBook(book)),
  beginDeleteBook: book => dispatch(beginDeleteBook(book)),
  beginEditBook: book => dispatch(beginEditBook(book))
});

export default connect(undefined, mapDispatchToProps)(Book);
