import React, { Component } from 'react'
import { connect } from 'react-redux'

class OrderListDetail extends Component {
  render() {
    let { product } = this.props
    return (
      <div className='col-12'>
        <div className='row'>
          <div className='col-md-3 col-4'>
            <img
              src={product.product.image}
              className='img-fluid'
              style={{ height: '200px' }}
            />
          </div>
          <div className='col-md-9 col-8'>
            <div className='row'>
              <p>{product.product.name}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(OrderListDetail)
