import React from "react";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
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
      localStorage.setItem("token", response.headers["x-auth"]);
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
      <form className="login" onSubmit={this.onLogin}>
        <input
          className="login__email"
          type="email"
          value={email}
          onChange={this.onEmailChange}
        />
        <input
          className="login__password"
          type="password"
          value={password}
          onChange={this.onPasswordChange}
        />
        <button className="login__btn">Login</button>
        {error && <span className="login__error">{error}</span>}
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user))
});

export default connect(undefined, mapDispatchToProps)(Login);
