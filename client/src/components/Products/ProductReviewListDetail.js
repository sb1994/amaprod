import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FaStar } from 'react-icons/fa'

class ProductReviewListDetail extends Component {
  render() {
    let { review } = this.props
    let { user } = review
    return (
      <div className='card mb-1'>
        <div className='row'>
          <div className='col-md-12'>
            <span>{user.name}</span>
            <img
              src={user.profile_pic}
              height={50}
              className='float-left rounded-circle'
            />

            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1
              return (
                <label key={index}>
                  <FaStar
                    size={25}
                    color={ratingValue <= review.rating ? '#ffc107' : '#e4e5e9'}
                    // className='star'
                  />
                </label>
              )
            })}

            <p>{review.text}</p>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductReviewListDetail)
