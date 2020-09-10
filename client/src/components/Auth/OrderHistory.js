import React, { Component } from 'react'
import { connect } from 'react-redux'
import OrderHistoryListItem from './OrderHistoryListItem'
class OrderHistory extends Component {
  render() {
    return (
      <div>
        <h1>Order OrderHistory</h1>
        <OrderHistoryListItem />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
