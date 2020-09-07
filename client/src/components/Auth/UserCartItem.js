import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserCartItem extends Component {
  render() {
    let { product } = this.props
    return (
      <div className='col-12'>
        <div className='row'>
          <div className='col-3'>
            <img
              src={product.product.image}
              className='img-fluid'
              style={{ height: 100 }}
            />
          </div>
          <div className='col-9'>
            <div className='row'>
              <div className='col-9'>
                <p>{product.product.name}</p>
                <p>Quatity: {product.quantity}</p>
              </div>
              <div className='col-3'>
                <p>Price: &#8364;{product.product.price}</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(UserCartItem)
