import React from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { beginAddBook } from "../../actions/books";

Modal.setAppElement("#app");

class Book extends React.Component {
  state = { showModal: false, shelf: "Want to Read" };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };
  handleCloseModal = () => {
    this.setState({ showModal: false });
  };
  onShelfChange = e => {
    const shelf = e.target.value;
    this.setState({ shelf });
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

  render() {
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
      <div className="results__book">
        <a onClick={this.handleOpenModal}>
          <img
            className="results__book-cover"
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
              <use xlinkHref="images/sprite.svg#icon-x-circle" />
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
                <use xlinkHref="images/sprite.svg#icon-book" />
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
                <use xlinkHref="images/sprite.svg#icon-authors" />
              </svg>
              <p>{authors ? authors.join(", ") : "No author information."}</p>
              <svg>
                <use xlinkHref="images/sprite.svg#icon-book-open" />
              </svg>
              <p>{pageCount ? `${pageCount} pages` : "No page information."}</p>
              <svg>
                <use xlinkHref="images/sprite.svg#icon-hash" />
              </svg>
              <p>
                {identifiers.length
                  ? identifiers[0].identifier
                  : "No ISBN or other identifying information."}
              </p>
            </div>
            <p className="book-modal__book-description">
              {description.length > 400
                ? description.slice(0, 400) + " ..."
                : description}
            </p>
            <select
              className="book-modal__select"
              value={this.state.shelf}
              onChange={this.onShelfChange}
            >
              <option value="Want to Read">Want to Read</option>
              <option value="Currently Reading">Currently Reading</option>
              <option value="Read">Read</option>
            </select>
            <a className="book-modal__submit" onClick={this.addBook}>
              <svg>
                <use xlinkHref="images/sprite.svg#icon-check-circle" />
              </svg>
            </a>
          </div>
        </Modal>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  beginAddBook: book => dispatch(beginAddBook(book))
});

export default connect(undefined, mapDispatchToProps)(Book);
