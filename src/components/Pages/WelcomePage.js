import React from "react";
import { Link } from "react-router-dom";

import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";

const WelcomePage = () => (
  <main className="welcome">
    <img src="/images/aliveberry.svg" className="welcome__logo" />
    <Link to="/signup" className="btn--signup">
      Signup
    </Link>
    <Link to="/login" className="btn--login">
      Login
    </Link>
  </main>
);

export default WelcomePage;
