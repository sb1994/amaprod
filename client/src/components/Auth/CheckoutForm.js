import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { returnTotalPrice } from '../../utils/functions'
class CheckoutForm extends Component {
  render() {
    let { isAuthenticated, user, cart } = this.props.auth
    let totalPrice = returnTotalPrice(cart)
    if (isAuthenticated) {
      return (
        <div className='row'>
          <h1>CheckoutForm</h1>
          <div className='col-12'>
            <p>Total Price: &#8364;{totalPrice}</p>
          </div>
          <div className='col-12'>
            <p>{user.name}</p>
          </div>
        </div>
      )
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)
