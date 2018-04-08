import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Logout from "../Auth/Logout";

const Sidebar = ({ email }) => (
  <div className="sidebar">
    <img src="images/aliveberry.svg" className="sidebar__logo" />
    <h1>Aliveberry</h1>
    <Link to="/">Search</Link>
    <Link to="/shelves">Shelves</Link>
    <Link to="/shelves/want-to-read">Want to Read</Link>
    <Link to="/shelves/currently-reading">Currently Reading</Link>
    <Link to="/shelves/read">Read</Link>
    <p>{email}</p>
    <Logout />
  </div>
);

const mapStateToProps = state => ({
  email: state.auth.email
});

export default connect(mapStateToProps)(Sidebar);
