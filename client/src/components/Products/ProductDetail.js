import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSelectedProduct } from '../../actions/productActions'

export class ProductDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    this.props.getSelectedProduct(this.props.match.params.id)
  }
  render() {
    console.log(this.props.product.product)
    let { product } = this.props.product
    let { isAuthenticated } = this.props.auth
    if (product === undefined) {
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
      return (
        <div className='container'>
          <div className='row'>
            <div className='col-6'>
              <img src={product.image} />
            </div>
            <div className='col-6'>
              <div className='row'>
                <div className='col-12'>
                  <h1>{product.name}</h1>
                  <p>{product.description}</p>
                </div>
                {isAuthenticated ? (
                  <div className='col-12'>
                    <button className='btn btn-primary'>Add to Cart</button>
                  </div>
                ) : null}
              </div>
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

const mapDispatchToProps = {}

export default connect(mapStateToProps, { getSelectedProduct })(ProductDetail)
