import React, { Component } from 'react'
import { connect } from 'react-redux'

class DashboardAccount extends Component {
  render() {
    let { user } = this.props.auth
    console.log(user)
    return (
      <div className='col-12'>
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
