import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserCartItem from './UserCartItem'
import CheckoutForm from './CheckoutForm'

export class UserCart extends Component {
  render() {
    let renderCartItems = this.props.auth.cart.map((item, index) => {
      return <UserCartItem key={index} product={item} />
    })
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 col-12'>
            <h1>User Cart</h1>
            {/* <hr /> */}
            {renderCartItems.length > 0 ? (
              renderCartItems
            ) : (
              <p>You have notihig in your cart</p>
            )}
          </div>

          <div className='col-md-6 col-12'>
            <CheckoutForm />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(UserCart)
