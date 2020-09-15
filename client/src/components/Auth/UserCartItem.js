import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './user_cart_item.css'
import {
  addToProductQuantity,
  removeFromProductQuantity,
} from '../../actions/userAuthActions'
class UserCartItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hover: false,
    }
  }
  handleAddToProductQuantity = () => {
    let { user, cart } = this.props.auth
    let { product } = this.props.product
    this.props.addToProductQuantity(product._id)
  }
  handleRemoveProductFromCart = () => {
    // let { user, cart } = this.props.auth
    let { product } = this.props.product
    this.props.removeFromProductQuantity(product._id)
    // console.log(product)
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
                <div className='row'>
                  <div className='col-12'>
                    <p
                      className='product-title'
                      onClick={this.handleShowProductDetail}
                    >
                      {product.product.name}
                    </p>
                  </div>
                  <div className='col-12'>
                    <span>Quantity: </span>
                    <button
                      className='btn btn-success'
                      onClick={this.handleRemoveProductFromCart}
                    >
                      -
                    </button>
                    <span> {product.quantity} </span>
                    <button
                      className='btn btn-success'
                      onClick={this.handleAddToProductQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default withRouter(
  connect(mapStateToProps, { addToProductQuantity, removeFromProductQuantity })(
    UserCartItem
  )
)
