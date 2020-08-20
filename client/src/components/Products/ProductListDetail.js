import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

export class ProductListDetail extends Component {
  handleProductShow = () => {
    console.log(this.props.productOb)
    console.log(this.props.history)
    this.props.history.push(`/products/${this.props.productOb._id}/detail`)
  }
  render() {
    let { productOb } = this.props
    return (
      <div className=' col-sm-6 col-md-3 col-6'>
        <div className='row'>
          <img
            onClick={this.handleProductShow}
            src={productOb.image}
            className='img-fluid'
            style={{ height: '300px' }}
          />
          <p onClick={this.handleProductShow}>{productOb.name}</p>
        </div>
        <div className='row'>
          <div className='col-6'>
            <p>€{productOb.price}</p>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ auth: state.auth })

const mapDispatchToProps = {}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductListDetail)
)
