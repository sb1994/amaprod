import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProducts } from '../../actions/productActions'
import ProductListDetail from './ProductListDetail'
import ProductFilter from './ProductFilter'
export class ProductList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchText: '',
      products: [],
      filterType: '',
    }
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
    let { products } = this.props.product
    let renderProducts = products.map((product) => {
      return <ProductListDetail productOb={product} key={product._id} />
    })
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <ProductFilter />
          </div>
          <div className='col-12'>
            <div className='row'>{renderProducts}</div>
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

export default connect(mapStateToProps, { getProducts })(ProductList)
