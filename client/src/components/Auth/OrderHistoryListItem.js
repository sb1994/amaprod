import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class OrderHistoryListItem extends Component {
  render() {
    return (
      <div>
        <h2>OrderList Item</h2>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderHistoryListItem)
)
