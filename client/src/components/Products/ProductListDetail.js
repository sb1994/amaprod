import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

export class ProductListDetail extends Component {
  handleProductShow = () => {
    console.log(this)
  }
  render() {
    let { productOb } = this.props
    return (
      <div className='col-3'>
        <img
          src={productOb.image}
          className='img-fluid'
          style={{ height: '300px' }}
        />
        <p>{productOb.name}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductListDetail)
)
