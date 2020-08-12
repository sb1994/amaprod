import React, { Component } from 'react'
import { connect } from 'react-redux'

class DashboardAccount extends Component {
  render() {
    return (
      <div>
        <h1>DashboardAccount</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAccount)
