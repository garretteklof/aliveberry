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

  componentWillMount() {
    document.body.style.overflow = "hidden";
  }
  componentWillUnmount() {
    document.body.style.overflow = "visible";
  }

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
      this.props.history.push("/shelves");
    } catch (e) {
      this.setState({
        error: "Cannot login. Please recheck your credentials."
      });
    }
  };

  loginExampleAccount = () => {
    this.setState(
      {
        email: "testdrive@aliveberry.com",
        password: "abc123"
      },
      () => this.formButton.click()
    );
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <div className="auth">
        <main className="auth__wrapper">
          <div className="auth__nav">
            <Link to="/welcome">
              <svg className="auth__backspace auth__backspace--login">
                <use xlinkHref="/images/sprite.svg#icon-arrow-left-circle" />
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
            <button
              className="btn btn--login"
              ref={button => {
                this.formButton = button;
              }}
            >
              Login
            </button>
            {error && <span className="auth__error">{error}</span>}
          </form>
          <aside className="auth__example">
            <svg>
              <use xlinkHref="/images/sprite.svg#icon-new" />
            </svg>
            <p>Test drive Aliveberry with an example login!</p>
            <a
              className="btn btn--example"
              role="button"
              type="submit"
              onClick={this.loginExampleAccount}
            >
              Try it!
            </a>
          </aside>
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user)),
  beginSetBooks: () => dispatch(beginSetBooks())
});

export default connect(undefined, mapDispatchToProps)(Login);
