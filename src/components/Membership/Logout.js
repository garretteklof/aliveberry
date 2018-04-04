import React from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { callLogout } from "../../api/auth";

class Logout extends React.Component {
  onLogout = () => {
    const token = localStorage.getItem("token");
    callLogout(token).then(() => {
      localStorage.removeItem("token");
      this.props.logout();
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

export default connect(undefined, mapDispatchToProps)(Logout);
