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
            <div className='col-12'>
              <p>{product.name}</p>
              <img src={product.image} alt='' srcset='' />
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
