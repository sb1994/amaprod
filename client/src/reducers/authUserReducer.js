import {
  SET_LOGGED_USER,
  SET_SEARCHED_USER,
  GET_USERS,
  ADD_PRODUCT_TO_CART,
  SET_USER_CART,
} from '../actions/action_types'
import isEmpty from '../validation/isEmpty'

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  isAuthenticated: false,
  user: {},
  searchedUser: {},
  users: [],
  cart: [],
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      }
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      }
    case SET_SEARCHED_USER:
      return {
        ...state,
        searchedUser: action.payload,
      }
    case ADD_PRODUCT_TO_CART:
      return {
        ...state,
        cart: action.payload,
      }
    case SET_USER_CART:
      return {
        ...state,
        cart: action.payload,
      }
    default:
      return state
  }
}

export default auth
