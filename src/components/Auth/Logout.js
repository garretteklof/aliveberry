import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "../../actions/auth";
import { callLogout } from "../../api/auth";

class Logout extends React.Component {
  onLogout = () => {
    const token = localStorage.getItem("token");
    callLogout(token).then(() => {
      localStorage.removeItem("token");
      this.props.logout();
      this.props.history.push("/welcome");
    });
  };

  render() {
    return (
      <button className="btn--logout" onClick={this.onLogout}>
        Logout
      </button>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default withRouter(connect(undefined, mapDispatchToProps)(Logout));
