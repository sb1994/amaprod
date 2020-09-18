import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './product_list_detail.css'

export class ProductListDetail extends Component {
  handleProductShow = () => {
    this.props.history.push(`/products/${this.props.productOb._id}/detail`)
  }
  render() {
    let { productOb } = this.props
    return (
      <div className=' col-sm-6 col-md-3 col-12 productCard card mb-3'>
        <img
          className='img-fluid'
          onClick={this.handleProductShow}
          src={productOb.image}
          style={{ height: '300px' }}
        />
        <p onClick={this.handleProductShow}>{productOb.name}</p>
        <strong>€{productOb.price}</strong>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ auth: state.auth })

const mapDispatchToProps = {}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductListDetail)
)
