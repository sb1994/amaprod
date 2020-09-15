import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentUser } from '../../actions/userAuthActions'
import DashboardAccount from './DashboardAccount'
import OrderHistory from './OrderHistory'
import { withRouter } from 'react-router-dom'

export class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    } else {
      this.props.getCurrentUser()
    }
  }
  componentDidUpdate(prevProps) {
    console.log()
    if (prevProps.auth.isAuthenticated !== this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  render() {
    let { user } = this.props.auth
    let renderOrderHistory
    if (user.order_history === undefined) {
      renderOrderHistory = <p>Loading</p>
    } else if (user.order_history.length <= 0) {
      renderOrderHistory = <p>You have no previous orders</p>
    } else {
      renderOrderHistory = <OrderHistory orders={user.order_history} />
    }
    return (
      <div className='container'>
        <div className='row'>
          <DashboardAccount />
          {renderOrderHistory}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default withRouter(
  connect(mapStateToProps, { getCurrentUser })(Dashboard)
)
