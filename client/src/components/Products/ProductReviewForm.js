import React, { Component } from "react";
import { connect } from "react-redux";
import { FaStar } from "react-icons/fa";
import "./product_review_form.css";
import { createProductReview } from "../../actions/productActions";
import { checkPurchaseStatus } from "../../utils/functions";

class ProductReviewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      rating: null,
      hover: null,
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };
  handleReviewFormSubmit = () => {
    let { product } = this.props.product;
    let { text, rating } = this.state;
    if (text === "" || rating === null) {
      console.log("Please enter a rating and review");
    } else {
      this.props.createProductReview(text, rating, product._id);
      this.setState({
        text: "",
        rating: "",
      });
    }
  };
  render() {
    let { rating, hover, text } = this.state;
    let { product } = this.props.product;
    let { user } = this.props.auth;
    // let checkedPurchaseStatus
    // if (user.order_history !== undefined && product !== undefined) {
    //   checkedPurchaseStatus = checkPurchaseStatus(product, user)
    // }
    // console.log(checkedPurchaseStatus)
    // console.log(user)

    return (
      <div>
        <h2>Product Review Form</h2>
        {/* creates an untitled array that takes that returns the fastars as params */}
        <p>Rating:</p>
        <div className="form-group">
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onChange={this.handleInputChange}
                />
                <FaStar
                  size={50}
                  color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                  className="star"
                />
              </label>
            );
          })}
        </div>
        <div className="form-group">
          <label>
            {" "}
            Product Review:
            <textarea
              type="text"
              value={this.state.text}
              name="text"
              onChange={this.handleInputChange}
              className="form-control"
            />
          </label>
        </div>
        <button
          className="btn btn-primary"
          onClick={this.handleReviewFormSubmit}
          disabled={rating === (null || "") || text === "" ? true : false}
        >
          Add Review
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.product,
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, { createProductReview })(
  ProductReviewForm
);
