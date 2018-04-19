import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MediaQuery from "react-responsive";

import SidebarDesktop from "./SidebarDesktop";
import SidebarMobile from "./SidebarMobile";

const Sidebar = props => (
  <MediaQuery maxWidth={"62.5em"}>
    {matches => {
      if (matches) {
        return <SidebarMobile {...props} />;
      } else {
        return <SidebarDesktop {...props} />;
      }
    }}
  </MediaQuery>
);

const mapStateToProps = state => ({
  email: state.auth.email
});

export default withRouter(connect(mapStateToProps)(Sidebar));
