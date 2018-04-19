import React from "react";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import Modal from "react-modal";

import Logout from "../Auth/Logout";

Modal.setAppElement("#app");

export default class SidebarMobile extends React.Component {
  state = { showModal: false };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };
  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { match, email } = this.props;
    return (
      <div className="sidebar">
        <div className="sidebar__top">
          <Link to="/" className="sidebar__logo">
            <img src="/images/aliveberry.svg" />
          </Link>
          <h1>Aliveberry</h1>
        </div>
        <svg className="sidebar__burger" onClick={this.handleOpenModal}>
          <use href="/images/sprite.svg#icon-menu" />
        </svg>
        <Modal
          contentLabel="Navigation Modal"
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          className="nav-modal"
        >
          <a className="nav-modal__close" onClick={this.handleCloseModal}>
            <svg>
              <use href="/images/sprite.svg#icon-x-circle" />
            </svg>
          </a>
          <nav className="nav-modal__nav">
            <Link
              to="/"
              className="nav-modal__link"
              onClick={this.handleCloseModal}
            >
              Search Books
            </Link>

            <Link
              to="/shelves"
              className="nav-modal__link"
              onClick={this.handleCloseModal}
            >
              Shelves
            </Link>
            <ul className="nav-modal__shelf-list">
              <Link to="/shelves/read" onClick={this.handleCloseModal}>
                Read
              </Link>
              <Link to="/shelves/want-to-read" onClick={this.handleCloseModal}>
                Want to Read
              </Link>
              <Link
                to="/shelves/currently-reading"
                onClick={this.handleCloseModal}
              >
                Currently Reading
              </Link>
            </ul>
            <Logout />
          </nav>
          <img src="/images/aliveberry.svg" className="nav-modal__logo" />
        </Modal>
      </div>
    );
  }
}
