import React from "react";
import { Link } from "react-router-dom";

import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";

const WelcomePage = () => (
  <div className="u-center-flex">
    <main className="welcome">
      <img src="/images/aliveberry.svg" className="welcome__logo" />
      <Link to="/signup" className="btn btn--signup">
        Signup
      </Link>
      <Link to="/login" className="btn btn--login">
        Login
      </Link>
    </main>
  </div>
);

export default WelcomePage;
