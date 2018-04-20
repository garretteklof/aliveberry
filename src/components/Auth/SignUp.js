import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../actions/auth";
import { callAddUser } from "../../api/users";

class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    error: ""
  };
  onEmailChange = e => {
    const email = e.target.value;
    this.setState(() => ({ email }));
  };
  onPasswordChange = e => {
    const password = e.target.value;
    this.setState(() => ({ password }));
  };

  onSignUp = async e => {
    e.preventDefault();
    try {
      const response = await callAddUser(this.state.email, this.state.password);
      localStorage.setItem("token", response.headers["x-auth"]);
      this.props.login(response.data);
      this.props.history.push("/");
    } catch (e) {
      this.setState({ error: "Invalid email and/or password." });
    }
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <div className="u-center-flex">
        <main className="auth">
          <div className="auth__nav">
            <Link to="/welcome">
              <svg className="auth__backspace auth__backspace--signup">
                <use href="/images/sprite.svg#icon-arrow-left-circle" />
              </svg>
            </Link>
            <img src="/images/aliveberry.svg" />
          </div>
          <form className="auth__form" onSubmit={this.onSignUp}>
            <div className="auth__form-group">
              <input
                className="auth__input auth__input--signup"
                type="email"
                placeholder="email"
                value={email}
                onChange={this.onEmailChange}
                autoFocus
              />
              <label
                htmlFor="email"
                className="auth__label auth__label--signup"
              >
                Email
              </label>
            </div>
            <div className="auth__form-group">
              <input
                className="auth__input auth__input--signup"
                type="password"
                placeholder="password"
                value={password}
                onChange={this.onPasswordChange}
              />
              <label
                htmlFor="password"
                className="auth__label auth__label--signup"
              >
                Password
              </label>
            </div>
            <button className="btn btn--signup">Signup</button>
            {error && <span className="auth__error">{error}</span>}
          </form>
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user))
});

export default connect(undefined, mapDispatchToProps)(SignUp);
