import React, { Component } from "react";
import { connect } from "react-redux";
import { getSelectedProduct } from "../../actions/productActions";
import ProductReviewForm from "./ProductReviewForm";
import ProductReviewList from "./ProductReviewList";

//ustils functions
import { checkReviewFormRender } from "../../utils/functions";

export class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.getSelectedProduct(this.props.match.params.id);
  }
  render() {
    // console.log(this.props.product.product)
    let { product } = this.props.product;
    let { isAuthenticated } = this.props.auth;
    let { user } = this.props.auth;
    if (product === undefined) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p>Loading</p>
            </div>
          </div>
        </div>
      );
    } else {
      let { reviews } = product;
      // console.log(reviews);
      if (reviews !== undefined) {
        // console.log(reviews)
        //checks if a user has already left a review so that
        //they can only leave one
        // let renderReviewForm = checkReviewFormRender(reviews, user._id);
        // let renderReviewForm = reviews.includes((review) => {
        //   if (review.user._id !== user._id) {
        //     return true
        //   }
        // })
        // console.log(renderReviewForm);
      }
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-12 col-sm-12">
              <img src={product.image} style={{ height: "300px" }} />
            </div>
            <div className="col-md-6 col-12 col-sm-12">
              <div className="row">
                <div className="col-12">
                  <h1>{product.name}</h1>
                  <p>{product.description}</p>
                </div>
                {isAuthenticated ? (
                  <div className="col-12">
                    <button className="btn btn-primary">Add to Cart</button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-12">
              <ProductReviewForm
                product_id={product.product_id}
                reviews={reviews}
              />
            </div>
            <div className="col-12">
              <ProductReviewList reviews={reviews} />
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  product: state.product,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, { getSelectedProduct })(ProductDetail);
