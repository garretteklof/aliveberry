import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../actions/auth";
import { beginSetBooks } from "../../actions/books";
import { callLogin } from "../../api/auth";

class Login extends React.Component {
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

  onLogin = async e => {
    e.preventDefault();
    try {
      const response = await callLogin(this.state.email, this.state.password);
      const token = response.headers["x-auth"];
      localStorage.setItem("token", token);
      this.props.beginSetBooks();
      this.props.login(response.data);
      this.props.history.push("/");
    } catch (e) {
      console.log(e);
      this.setState({ error: "There has been an error" });
    }
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <main className="auth">
        <div className="auth__nav">
          <Link to="/welcome">
            <svg className="auth__backspace auth__backspace--login">
              <use href="/images/sprite.svg#icon-arrow-left-circle" />
            </svg>
          </Link>
          <img src="/images/aliveberry.svg" />
        </div>
        <form className="auth__form" onSubmit={this.onLogin}>
          <div className="auth__form-group">
            <input
              className="auth__input auth__input--login"
              type="email"
              placeholder="email"
              value={email}
              onChange={this.onEmailChange}
              autoFocus
            />
            <label htmlFor="email" className="auth__label auth__label--login">
              Email
            </label>
          </div>
          <div className="auth__form-group">
            <input
              className="auth__input auth__input--login"
              type="password"
              placeholder="password"
              value={password}
              onChange={this.onPasswordChange}
            />
            <label
              htmlFor="password"
              className="auth__label auth__label--login"
            >
              Password
            </label>
          </div>
          <button className="btn btn--login">Login</button>
          {error && <span className="auth__error">{error}</span>}
        </form>
      </main>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user)),
  beginSetBooks: () => dispatch(beginSetBooks())
});

export default connect(undefined, mapDispatchToProps)(Login);
