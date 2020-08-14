import {
  GET_PRODUCTS,
  GET_PRODUCT,  
} from '../actions/action_types'



const initialState = {
  product: {},
  products: [],
}

const product = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      }
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      }
    default:
      return state
  }
}

export default product