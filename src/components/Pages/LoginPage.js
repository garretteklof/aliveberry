import React from "react";

import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";

const LoginPage = ({ history }) => (
  <section>
    <Login history={history} />
    <SignUp history={history} />
  </section>
);

export default LoginPage;
