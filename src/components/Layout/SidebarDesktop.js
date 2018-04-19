import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Route } from "react-router-dom";

import Logout from "../Auth/Logout";

const SidebarDesktop = ({ email, match }) => (
  <div className="sidebar">
    <div className="sidebar__top">
      <Link to="/" className="sidebar__logo">
        <img src="/images/aliveberry.svg" />
      </Link>
      <h1>Aliveberry</h1>
    </div>
    <nav className="sidebar__nav">
      <NavLink
        exact
        to="/"
        className="sidebar__nav-link sidebar__nav-link--one"
      >
        Search Books
      </NavLink>
      <svg className="sidebar__icon sidebar__icon--one">
        <use href="/images/sprite.svg#icon-bullet" />
      </svg>

      <NavLink
        to="/shelves"
        className="sidebar__nav-link sidebar__nav-link--two"
      >
        Shelves
      </NavLink>
      <svg className="sidebar__icon sidebar__icon--two">
        <use href="/images/sprite.svg#icon-bullet" />
      </svg>
      <Route
        path={`${match.path}shelves`}
        render={() => (
          <ul className="sidebar__shelf-list">
            <NavLink to="/shelves/read">Read</NavLink>
            <NavLink to="/shelves/want-to-read">Want to Read</NavLink>
            <NavLink to="/shelves/currently-reading">Currently Reading</NavLink>
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

export default SidebarDesktop;
