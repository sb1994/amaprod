import React, { Component } from 'react'
import { connect } from 'react-redux'
import OrderHistoryListItem from './OrderHistoryListItem'
class OrderHistory extends Component {
  render() {
    let renderOrders
    let { orders } = this.props
    if (orders.length > 0) {
      renderOrders = orders.map((order, index) => {
        return <OrderHistoryListItem order={order} key={index} />
      })
    }
    return <div className='col-12 col-md-9'>{renderOrders}</div>
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
