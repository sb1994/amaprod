import React, { Component } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../actions/productActions";
import ProductListDetail from "./ProductListDetail";
export class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
      products: [],
      filterType: "",
    };
  }
  componentDidMount() {
    this.props.getProducts();
  }
  handleTypeFilter = (type) => {
    // console.log(type);
    this.setState({
      filterType: type,
    });
  };

  handleSearchInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    let { products } = this.props.product;
    let typesArray = products.map((product) => {
      return product.type;
    });
    let typeSet = new Set(typesArray);
    let uniqueTypeArray = [...typeSet];

    if (
      products === undefined &&
      products.length === 0 &&
      uniqueTypeArray.length <= 0
    ) {
      return (
        <div className="container">
          <h1>LOading</h1>
        </div>
      );
    } else {
      if (this.state.searchText === "" && this.state.filterType == "") {
        let renderProducts = products.map((product) => {
          return <ProductListDetail productOb={product} key={product._id} />;
        });
        let renderTypes = uniqueTypeArray.map((type, index) => {
          return (
            <button
              key={index}
              className="btn btn-primary"
              onClick={() => this.handleTypeFilter(type)}
            >
              {type}
            </button>
          );
        });

        return (
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-8 offset-sm-2 container-search-input mb-2">
                <input
                  type="text"
                  name="searchText"
                  onChange={this.handleSearchInput}
                  value={this.state.searchText}
                  className="form-control"
                  placeholder=" Search for products"
                />
              </div>
              <div className="col-12">{renderTypes}</div>
              <div className="col-12">
                <div className="row">{renderProducts}</div>
              </div>
            </div>
          </div>
        );
      } else if (this.state.searchText !== "" && this.state.filterType == "") {
        let fileredProducts = products.filter((product) => {
          return product.name.toLowerCase().includes(this.state.searchText);
        });
        let renderProducts = fileredProducts.map((product) => {
          return <ProductListDetail productOb={product} key={product._id} />;
        });
        let renderTypes = uniqueTypeArray.map((type, index) => {
          return (
            <button
              key={index}
              className="btn btn-primary"
              onClick={() => this.handleTypeFilter(type)}
            >
              {type}
            </button>
          );
        });
        return (
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-8 offset-sm-2 container-search-input mb-2">
                <input
                  type="text"
                  name="searchText"
                  onChange={this.handleSearchInput}
                  value={this.state.searchText}
                  className="form-control"
                  placeholder=" Search for products"
                />
              </div>
              <div className="col-12">{renderTypes}</div>
              <div className="col-12">
                <div className="row">
                  <div className="col-md-12">
                    <p>{fileredProducts.length}</p>
                  </div>
                </div>
                <div className="row">{renderProducts}</div>
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

const mapStateToProps = (state) => ({
  product: state.product,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, { getProducts })(ProductList);
