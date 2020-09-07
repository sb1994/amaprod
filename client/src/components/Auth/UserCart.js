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
          <div className='col-6'>
            <h1>User Cart</h1>
            {/* <hr /> */}
            {renderCartItems}
          </div>

          <div className='col-6'>
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
