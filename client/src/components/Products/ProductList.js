import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProducts } from '../../actions/productActions'
import ProductListDetail from './ProductListDetail'
import ProductFilter from './ProductFilter'
export class ProductList extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getProducts()
  }
  // handleTypeFilter = (type) => {
  //   // console.log(type);
  //   this.setState({
  //     filterType: type,
  //   })
  // }

  // handleSearchInput = (e) => {
  //   this.setState({ [e.target.name]: e.target.value })
  // }

  render() {
    let { products, text, type } = this.props.product
    let renderProducts
    if (products === undefined) {
      renderProducts = (
        <div className='col-12'>
          {' '}
          <p>Loading</p>
        </div>
      )
    } else if (text === '' && type === '' && products !== undefined) {
      console.log('No Filters Applied and products Havent loaded yet')
      renderProducts = products.map((product) => {
        return <ProductListDetail productOb={product} key={product._id} />
      })
    } else if (text !== '' && type === '') {
      console.log('Just Text filter was applied')
      let textFilterProducts = products.filter((product) =>
        product.name.toLowerCase().includes(text)
      )
      console.log(textFilterProducts)
      renderProducts = textFilterProducts.map((product) => {
        return <ProductListDetail productOb={product} key={product._id} />
      })
    } else if (text === '' && type !== '') {
      console.log('Type Filter Only was applied')

      let typeFilterProducts = products.filter(
        (product) => product.type === type
      )
      console.log(typeFilterProducts)
      renderProducts = typeFilterProducts.map((product) => {
        return <ProductListDetail productOb={product} key={product._id} />
      })
    } else if (text !== '' && type !== '') {
      console.log('Both filters were set')
      let textFilterProducts = products.filter((product) =>
        product.name.toLowerCase().includes(text)
      )
      let typeFilterProducts = textFilterProducts.filter(
        (product) => product.type === type
      )
      renderProducts = typeFilterProducts.map((product) => {
        return <ProductListDetail productOb={product} key={product._id} />
      })
    }

    return (
      <div className='container'>
        <div className='col-md-12'>
          <div className='row'>
            <ProductFilter />
          </div>
        </div>
        <div className='col-md-12'>
          <div className='row'>{renderProducts}</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  product: state.product,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, { getProducts })(ProductList)
