import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProducts } from '../../actions/productActions'
import ProductListDetail from './ProductListDetail'
export class ProductList extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }
  componentDidMount() {
    this.props.getProducts()
  }

  // handleShowProduct=()=>{
  //   let {history} = this.props

  //   history.
  // }

  render() {
    let { products } = this.props.product
    console.log(products)
    if (products === undefined) {
      return (
        <div className='container'>
          <h1>Sorry someting went wrong</h1>
        </div>
      )
    } else if (products.length === 0) {
      return (
        <div className='container'>
          <div className='row'>
            <h1>Sorry no Products exist</h1>
          </div>
        </div>
      )
    } else {
      let renderProducts = products.map((product) => {
        return <ProductListDetail productOb={product} key={product._id} />
      })
      return (
        <div className='container'>
          <div className='row'>
            <h1>ProductList</h1>
            <div className='col-12 container-search-input'>
              <h1>Search Input Component</h1>
            </div>
            <div className='col-12'>
              <div className='row'>{renderProducts}</div>
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  product: state.product,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, { getProducts })(ProductList)
