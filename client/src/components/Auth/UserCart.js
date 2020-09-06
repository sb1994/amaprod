import React, { Component } from "react";
import { connect } from "react-redux";

export class UserCart extends Component {
  render() {
    return (
      <div className="container">
        <h1>User Cart</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserCart);
