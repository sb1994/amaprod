import {
  GET_PRODUCTS,
  GET_PRODUCT,
  CREATE_PRODUCT_REVIEW,
  SET_PRODUCT_FILTER_TEXT,
  SET_PRODUCT_FILTER_TYPE,
} from '../actions/action_types'

const initialState = {
  product: {},
  products: [],
  productCount: '',
  filteredProducts: [],
  type: '',
  text: '',
}

const product = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
        productCount: action.payload.totalCount,
      }
    case SET_PRODUCT_FILTER_TYPE:
      return {
        ...state,
        type: action.payload,
      }
    case SET_PRODUCT_FILTER_TEXT:
      return {
        ...state,
        text: action.payload,
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
