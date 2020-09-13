import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

export class ProductFilter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      products: [],
      type: '',
    }
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    let { products } = this.props.product
    console.log(products)
    let typesArray = products.map((product) => {
      return product.type
    })
    let typeSet = new Set(typesArray)
    let uniqueTypeArray = [...typeSet]
    // const unique = [...new Set(products.map((product) => product.type))]

    console.log(uniqueTypeArray)
    // console.log(unique)
    return (
      <div className='col-12'>
        <h2>ProductFilter</h2>
        {/* <div className='col-12 col-md-8 offset-sm-2 container-search-input mb-2'> */}
        <div className='form-group'>
          <input
            type='text'
            name='searchText'
            onChange={this.handleSearchInput}
            value={this.state.name}
            className='form-control'
            placeholder=' Search for products'
          />
        </div>
        {/* </div> */}
        <div className='form-group'>
          <select
            name='type'
            onChange={this.handleInput}
            value={this.state.type}
          >
            <option> None</option>
            {uniqueTypeArray.map((type) => (
              <option value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* <div className="col-12">{renderTypes}</div> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  product: state.product,
})

const mapDispatchToProps = {}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductFilter)
)
