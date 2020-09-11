import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Moment from 'react-moment'
import OrderListDetail from './OrderListDetail'
class OrderHistoryListItem extends Component {
  render() {
    let { order } = this.props

    let renderOrderProductsDetail = order.products.map((product, index) => {
      return <OrderListDetail product={product} key={index} />
    })
    return (
      <div className='col-12'>
        <div className='row'>
          <div className='col-12 card mb-2'>
            <span>
              Ordered: <Moment format='DD/MM/YYYY'>{order.order_date}</Moment>
            </span>
            <div className='row'>{renderOrderProductsDetail}</div>
            <hr />
            <span>Total Price: &#8364;{order.total_price}</span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderHistoryListItem)
)
