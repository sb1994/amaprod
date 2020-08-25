import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductReviewListDetail from './ProductReviewListDetail'
class ProductReviewList extends Component {
  render() {
    let { reviews } = this.props
    if (reviews === undefined) {
      return (
        <div>
          <h2>Something went wrong</h2>
        </div>
      )
    } else if (reviews.length === 0) {
      return (
        <div>
          <h2>Be the first to leave a review</h2>
        </div>
      )
    } else {
      let renderReviews = reviews.map((review, index) => (
        <ProductReviewListDetail review={review} key={index} />
      ))
      return <div>{renderReviews}</div>
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ProductReviewList)
