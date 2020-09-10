import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { returnTotalPrice } from '../../utils/functions'
import { clearCart, proceedWithPurchase } from '../../actions/userAuthActions'
class CheckoutForm extends Component {
  handleClearCart = () => {
    console.log('clearing cart')
    this.props.clearCart()
  }
  handlePurchaseClick = () => {
    let { cart, user } = this.props.auth
    let totalPrice = returnTotalPrice(cart)
    this.props.proceedWithPurchase(cart, totalPrice)
    // this.props.history.push('/dashboard')
  }
  render() {
    let { isAuthenticated, user, cart } = this.props.auth
    let totalPrice = returnTotalPrice(cart)
    if (isAuthenticated) {
      if (cart.length > 0) {
        return (
          <div className='row'>
            <h1>CheckoutForm</h1>
            <div className='col-12'>
              <p>Total Price: &#8364;{totalPrice}</p>
            </div>
            <div className='col-12'>
              <button
                className='btn btn-primary'
                onClick={this.handlePurchaseClick}
              >
                Proceed
              </button>
              <button className='btn btn-danger' onClick={this.handleClearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        )
      } else {
        return (
          <div className='row'>
            <h1>CheckoutForm</h1>
            <div className='col-12'>
              <p>You Have Nothing in your cart</p>
            </div>
          </div>
        )
      }
    } else {
      return (
        <div className='row'>
          <h1>CheckoutForm</h1>
          <div className='col-12'>
            <p>please login to proceed with the purchase</p>
            <Link to='/login'>Login</Link>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default withRouter(
  connect(mapStateToProps, { clearCart, proceedWithPurchase })(CheckoutForm)
)
