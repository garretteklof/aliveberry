import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Route, withRouter } from "react-router-dom";

import Logout from "../Auth/Logout";

class Sidebar extends React.Component {
  constructor() {
    super();
    this.defaultState = {
      hoverLinkOne: false,
      hoverLinkTwo: false,
      activeLinkOne: true,
      activeLinkTwo: false
    };
    this.state = this.defaultState;
  }
  render() {
    const { match, email } = this.props;
    const {
      hoverLinkOne,
      hoverLinkTwo,
      activeLinkOne,
      activeLinkTwo
    } = this.state;
    return (
      <div className="sidebar">
        <div className="sidebar__top">
          <Link
            to="/"
            className="sidebar__logo"
            onClick={() => this.setState({ ...this.defaultState })}
          >
            <img src="images/aliveberry.svg" />
          </Link>
          <h1>Aliveberry</h1>
        </div>
        <nav className="sidebar__nav">
          <svg
            className={`sidebar__icon ${
              hoverLinkOne ? "sidebar__icon--hovered" : ""
            } ${activeLinkOne ? "sidebar__icon--active" : ""}`}
          >
            <use href="images/sprite.svg#icon-bullet" />
          </svg>

          <Link
            to="/"
            className="sidebar__nav-link"
            onMouseEnter={() => this.setState({ hoverLinkOne: true })}
            onMouseLeave={() =>
              this.setState({
                hoverLinkOne: false
              })
            }
            onClick={() =>
              this.setState({
                activeLinkOne: true,
                activeLinkTwo: false
              })
            }
          >
            Search Books
          </Link>
          <svg
            className={`sidebar__icon ${
              hoverLinkTwo ? "sidebar__icon--hovered" : ""
            } ${activeLinkTwo ? "sidebar__icon--active" : ""}`}
          >
            <use href="images/sprite.svg#icon-bullet" />
          </svg>

          <Link
            to="/shelves"
            className="sidebar__nav-link"
            onMouseEnter={() => this.setState({ hoverLinkTwo: true })}
            onMouseLeave={() =>
              this.setState({
                hoverLinkTwo: false
              })
            }
            onClick={() =>
              this.setState({
                activeLinkOne: false,
                activeLinkTwo: true
              })
            }
          >
            Shelves
          </Link>
          <Route
            path={`${match.path}shelves`}
            render={() => (
              <ul className="sidebar__shelf-list">
                <NavLink to="/shelves/read">Read</NavLink>
                <NavLink to="/shelves/want-to-read">Want to Read</NavLink>
                <NavLink to="/shelves/currently-reading">
                  Currently Reading
                </NavLink>
              </ul>
            )}
          />
        </nav>
        <div className="sidebar__bottom">
          <div className="sidebar__email">
            <span>{email.split("@")[0]}</span>
            <span>@{email.split("@")[1]}</span>
          </div>
          <Logout />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  email: state.auth.email
});

export default withRouter(connect(mapStateToProps)(Sidebar));
