import React from "react";
import { connect } from "react-redux";
const WantToRead = () => <div>Want to Read</div>;
const mapStateToProps = state => ({
  books: state.books
});

export default connect(mapStateToProps)(WantToRead);
