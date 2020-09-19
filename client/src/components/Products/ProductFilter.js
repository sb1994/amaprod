import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  setProductFilterText,
  setProductFilterType,
} from '../../actions/productActions'

export class ProductFilter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: '',
      products: [],
      type: '',
    }
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    if (e.target.name === 'text') {
      this.props.setProductFilterText(
        e.target.value,
        this.props.product.products,
        this.state.type
      )
    } else {
      this.setState({ [e.target.name]: e.target.value })
      this.props.setProductFilterType(
        e.target.value,
        this.props.product.products,
        this.state.name
      )
    }
  }

  render() {
    let { products } = this.props.product
    let typesArray = products.map((product) => {
      return product.type
    })
    let typeSet = new Set(typesArray)
    let uniqueTypeArray = [...typeSet]
    return (
      <div className='col-12 mt-3'>
        <div className='form-group'>
          <div className='row'>
            <div className='col-6'>
              <input
                id='text'
                type='text'
                name='text'
                onChange={this.handleInput}
                value={this.state.text}
                className='form-control'
                placeholder=' Search for products'
              />
            </div>
            <div className='col-3'>
              <select
                name='type'
                className='form-control'
                onChange={this.handleInput}
                value={this.state.type}
              >
                {uniqueTypeArray.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  product: state.product,
})

const mapDispatchToProps = {}

export default withRouter(
  connect(mapStateToProps, { setProductFilterText, setProductFilterType })(
    ProductFilter
  )
)
