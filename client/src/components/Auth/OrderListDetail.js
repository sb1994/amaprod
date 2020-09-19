import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
class OrderListDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  handleShowItem = () => {
    let { product, history } = this.props
    let selectedProduct = product.product
    let { _id } = product
    console.log(product)
    // lgo
    // console.log(_id)
    // console.log(history)
    this.props.history.push(`/products/${selectedProduct._id}/detail`)
  }
  render() {
    let { product } = this.props
    return (
      <div className='col-12'>
        <div className='row'>
          <div className='col-md-3 col-sm-6 col-12'>
            <img
              onClick={this.handleShowItem}
              src={product.product.image}
              className='img-fluid'
              style={{ height: '150px' }}
            />
          </div>
          <div className='col-md-9 col-sm-6 col-12'>
            <p onClick={this.handleShowItem}>{product.product.name}</p>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderListDetail)
)
