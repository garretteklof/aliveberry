import React from "react";
import { connect } from "react-redux";

const Read = () => <div>Read</div>;

const mapStateToProps = state => ({
  books: state.books
});

export default connect(mapStateToProps)(Read);
