import React from "react";
import { connect } from "react-redux";
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
      console.log(e);
      this.setState({ error: "There has been an error" });
    }
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <form className="signup" onSubmit={this.onSignUp}>
        <input
          className="signup__email"
          type="email"
          value={email}
          onChange={this.onEmailChange}
        />
        <input
          className="signup__password"
          type="password"
          value={password}
          onChange={this.onPasswordChange}
        />
        <button className="signup__btn">Login</button>
        {error && <span className="signup__error">{error}</span>}
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user))
});

export default connect(undefined, mapDispatchToProps)(SignUp);
