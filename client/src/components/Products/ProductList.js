import React, { Component } from "react";
import { connect } from "react-redux";

export class ProductList extends Component {
  render() {
    return (
      <div>
        <h1>ProductList</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
