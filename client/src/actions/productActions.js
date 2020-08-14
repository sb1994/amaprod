import axios from 'axios'
import * as types from './action_types'

export const getProducts = () => (dispatch) => {
  // dispatch(setPostLoading());
  // console.log(feed_id)
    axios
      .get(`/api/products`)
      .then(
        (res) => {
          // console.log(res.data)
          if (res.data === null) {
            console.log('data null')
          } else {
            // console.log(res.data)
            dispatch({
              type: types.GET_PRODUCTS,
              payload: res.data,
            })
          }
        }
        // console.log(res)
      )
      .catch((err) =>
        dispatch({
          type: types.GET_PRODUCTS,
          payload: null,
        })
      )
  
}
export const getSelectedProduct = (id) => (dispatch) => {
  // dispatch(setPostLoading());
  // console.log(feed_id)
  if (id === undefined) {
    console.log('feed_id undeined')
  } else {
    axios
      .get(`/api/products/${id}`)
      .then(
        (res) => {
          // console.log(res.data)
          if (res.data === null) {
            console.log('data null')
          } else {
            // console.log(res.data)
            dispatch({
              type: types.GET_PRODUCT,
              payload: res.data,
            })
          }
        }
        // console.log(res)
      )
      .catch((err) =>
        dispatch({
          type: types.GET_PRODUCT,
          payload: null,
        })
      )
  }
}