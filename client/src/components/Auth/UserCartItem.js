import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './user_cart_item.css'
class UserCartItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hover: false,
    }
  }

  handleShowProductDetail = () => {
    let { id } = this.props.product
    this.props.history.push(`/products/${id}/detail`)
  }
  render() {
    let { product } = this.props
    return (
      <div className='col-12'>
        <div className='row'>
          <div className='col-3'>
            <img
              src={product.product.image}
              className='img-fluid product-img'
              style={{ height: 100 }}
              onClick={this.handleShowProductDetail}
            />
          </div>
          <div className='col-9'>
            <div className='row'>
              <div className='col-9'>
                <p
                  className='product-title'
                  onClick={this.handleShowProductDetail}
                >
                  {product.product.name}
                </p>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserCartItem)
)
