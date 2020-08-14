import { combineReducers } from 'redux'
import authUserReducer from './authUserReducer'
import productReducer from './productReducer'
import errorReducer from './errorReducer'

export default combineReducers({
  auth: authUserReducer,
  product:productReducer,
  errors: errorReducer,
})
