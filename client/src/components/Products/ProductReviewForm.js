import React, { Component } from 'react'
import { connect } from 'react-redux'

class ProductReviewForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: '',
    }
  }

  handleTextInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleReviewFormSubmit = () => {}
  render() {
    console.log(this.props.product)
    return (
      <div>
        <h2>Product Review Form</h2>
        <p>{this.props.product.product._id}</p>
        <input
          type='text'
          value={this.state.text}
          onChange={this.handleTextInputChange}
        />
        <button className='btn btn-primary'>Add Review</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  product: state.product,
  auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ProductReviewForm)
