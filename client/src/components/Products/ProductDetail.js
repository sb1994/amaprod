import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSelectedProduct } from '../../actions/productActions'
import { addProductToCart, getCurrentUser } from '../../actions/userAuthActions'
import ProductReviewForm from './ProductReviewForm'
import ProductReviewList from './ProductReviewList'
import { checkPurchaseStatus } from '../../utils/functions'
import { render } from 'react-dom'

export class ProductDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    this.props.getSelectedProduct(this.props.match.params.id)
    this.props.getCurrentUser()
  }
  handleAddToCart = () => {
    let { product } = this.props.product
    this.props.addProductToCart(product)
  }

  handleShowCart = () => {
    this.props.history.push('/cart')
  }
  render() {
    // console.log(this.props.product.product)
    let { product } = this.props.product
    let { cart } = this.props.auth
    let { user } = this.props.auth

    // return (
    //   <div className='container'>
    //     <h1>Hello</h1>
    //   </div>
    // )

    // console.log(user)

    if (product === undefined && user.order_history === undefined) {
      return (
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <p>Loading</p>
            </div>
          </div>
        </div>
      )
    } else {
      let { reviews } = product

      let alreadyPurchased = checkPurchaseStatus(product, user)
      // console.log(alreadyPurchased)
      // if (user.order_history !== undefined) {
      //   console.log('orders not defined')
      // } else {
      //   console.log(order_history)
      // }
      let alreadyReviewed
      let alreadyInCart = cart.some((item) => {
        return item.id === product._id
      })
      // console.log(reviews);
      if (reviews !== undefined) {
        alreadyReviewed = reviews.some((review) => {
          return review.user._id === user._id
        })
      }

      //renders if the user can review or has already purchased the product

      let renderReviewForm

      console.log(alreadyPurchased, alreadyReviewed)
      if (alreadyReviewed && alreadyPurchased) {
        renderReviewForm = (
          <div className='col-12'>
            <p>you have already reviewed this product</p>
          </div>
        )
      } else if (!alreadyReviewed && alreadyPurchased) {
        renderReviewForm = (
          <div className='col-12'>
            <ProductReviewForm
              product_id={product.product_id}
              reviews={reviews}
            />
          </div>
        )
      } else {
        renderReviewForm = (
          <div className='col-12'>
            <p>You need to purchase this item inorder to review it</p>
          </div>
        )
      }

      return (
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 col-12 col-sm-12'>
              <img src={product.image} style={{ height: '200px' }} />
            </div>
            <div className='col-md-6 col-12 col-sm-12'>
              <div className='row'>
                <div className='col-12'>
                  <h1>{product.name}</h1>
                  <p>{product.description}</p>
                </div>
                {alreadyInCart === false ? (
                  <div className='col-12'>
                    <button
                      className='btn btn-primary'
                      onClick={this.handleAddToCart}
                    >
                      Add to Cart
                    </button>
                  </div>
                ) : (
                  <div className='col-12'>
                    <button
                      className='btn-warning btn'
                      onClick={this.handleShowCart}
                    >
                      Show in Cart
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <hr />
          <div className='row'>
            {renderReviewForm}
            {/* {alreadyReviewed ? (
              <div className='col-12'>
                <p>you have already reviewed this product</p>
              </div>
            ) : (
              <div className='col-12'>ndsjnakj</div>
            )} */}
            <div className='col-12'>
              <ProductReviewList reviews={reviews} />
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  product: state.product,
})

export default connect(mapStateToProps, {
  getSelectedProduct,
  addProductToCart,
  getCurrentUser,
})(ProductDetail)
