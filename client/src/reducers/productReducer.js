import {
  GET_PRODUCTS,
  GET_PRODUCT,
  CREATE_PRODUCT_REVIEW,
} from '../actions/action_types'

const initialState = {
  product: {},
  products: [],
  productCount: '',
  filteredProducts: [],
}

const product = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
        productCount: action.payload.totalCount,
      }
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      }
    case CREATE_PRODUCT_REVIEW:
      return {
        ...state,
        product: action.payload,
      }
    default:
      return state
  }
}

export default product
