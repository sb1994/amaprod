import axios from 'axios'
import setUserToken from '../utils/setUserToken'
import jwt_decode from 'jwt-decode'

import * as types from './action_types'

// Register User
export const registerUser = (userData) => (dispatch) => {
  axios
    .post('/api/users/register', userData)
    .then((res) => console.log('hello'))

    .catch((err) =>
      dispatch({
        type: types.FAIL_AUTH,
        payload: err.response.data,
      })
    )
}

export const getUsers = () => (dispatch) => {
  axios
    .get('/api/users/all')
    .then((res) =>
      dispatch({
        type: types.GET_USERS,
        payload: res.data,
      })
    )

    .catch((err) =>
      dispatch({
        type: types.FAIL_GET_USERS,
        payload: err.response.data,
      })
    )
}
export const startAuth = () => {
  return {
    type: types.START_AUTH,
  }
}
export const successAuth = (token) => {
  return {
    type: types.SUCCESS_AUTH,
    token: token,
  }
}
export const successUpload = (token) => {
  return {
    type: types.SUCCESS_UPLOAD,
    // token: token
  }
}
export const failAuth = (error) => {
  return {
    type: types.FAIL_AUTH,
    error: error,
  }
}
// Set logged in user
export const setLoggedUser = (decoded) => {
  return {
    type: types.SET_LOGGED_USER,
    payload: decoded,
  }
}

export const getCurrentUser = () => {
  return (dispatch) => {
    axios
      .get('/api/users/current')
      .then((result) => {
        // console.log(result)

        dispatch(setLoggedUser(result.data))
        // console.log(result.data);
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
}
export const getSearchedUser = (id) => {
  return (dispatch) => {
    axios
      .get(`/api/users/${id}`)
      // .get(`https://jsonplaceholder.typicode.com/todos/1`)
      .then((result) => {
        dispatch(setSearchedUser(result.data))
        // console.log(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const setSearchedUser = (user) => {
  return {
    type: types.SET_SEARCHED_USER,
    payload: user,
  }
}
export const loginAuth = (email, password) => {
  return (dispatch) => {
    dispatch(startAuth())
    axios
      .post('api/users/login', {
        email: email,
        password: password,
      })
      .then((result) => {
        const token = result.data.token
        //sets the expirey date
        // const expire = new Date(new Date().getTime() + 10000 * 1000)
        //stores the the token and the expireation date in the browser
        //as a cookie
        localStorage.setItem('token', token)
        setUserToken(token)
        console.log(token)
        const decoded = jwt_decode(token)
        dispatch(setLoggedUser(decoded))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
export const registerAuth = ({ password, name, email }) => {
  //alert that the register has started
  return (dispatch) => {
    dispatch(startAuth())

    axios
      .post('api/users/register', {
        password,
        name,
        email,
      })
      .then((result) => {
        console.log(result)

        // let { token } = result.data
        // //stores the the token and the expireation date in the browser
        // //as a cookie
        // if (token !== '') {
        //   localStorage.setItem('token', token)
        //   setUserToken(token)
        //   const decoded = jwt_decode(token)
        //   dispatch(setLoggedUser(decoded))
        // } else {
        //   console.log(result.data.email)
        // }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
export const updateUser = (updatedUser) => (dispatch) => {
  console.log(updatedUser)
  dispatch(startAuth())

  let {
    bio,
    website,
    location,
    status,
    githubusername,
    profile_pic,
  } = updatedUser

  axios
    .post('/api/users/update', {
      // hello: 'this is my code'
      bio,
      website,
      location,
      status,
      githubusername,
      profile_pic,
    })
    .then((result) => {
      dispatch(setLoggedUser(result.data.user))
    })
    .catch((err) => {
      console.log(err)
    })
}
export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem('token')
  // Remove auth header for future requests
  setUserToken(false)
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setLoggedUser({}))
  dispatch(setSearchedUser({}))
}
export const setProductCart = (cartToken) => (dispatch) => {
  console.log(cartToken)
  dispatch({
    type: types.SET_USER_CART,
    payload: cartToken,
  })
}
export const addProductToCart = (product) => (dispatch) => {
  //cookie solution
  let cart = localStorage.getItem('cart')

  if (cart === null) {
    console.log('cart token doesnt exist')
    let quantity = 1
    let cartProduct = {
      id: product._id,
      quantity,
      product,
    }
    let updatedCart = []
    updatedCart.push(cartProduct)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    dispatch({
      type: types.ADD_PRODUCT_TO_CART,
      payload: updatedCart,
    })
  } else {
    //parses the cart token into an array
    let parsedCart = JSON.parse(cart)

    //checks wether the product is already in the cart
    let productAlreadyAddedToCart = parsedCart.some(
      (item) => item.id === product._id
    )
    if (productAlreadyAddedToCart) {
      console.log('adding one more to the quantity')
      //finds the index of the array so that the quatity can be edited
      let index = parsedCart.findIndex((item) => item.id === product._id)
      console.log(index)
      //creates a copy of the parsed cart that can be manipulated
      let updatedCart = parsedCart
      let quantity = updatedCart[index].quantity + 1
      console.log(quantity)

      //
      updatedCart[index].quantity = updatedCart[index].quantity + 1
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      dispatch({
        type: types.ADD_PRODUCT_TO_CART,
        payload: updatedCart,
      })
      // console.log(updatedCart[index].quantity)
    } else {
      //if the product doesnt exist in the cart then it gets pushed into the cart
      let quantity = 1
      let cartProduct = {
        id: product._id,
        quantity,
        product,
      }
      let updatedCart = parsedCart
      // cart.push({ id: product._id })
      updatedCart.push(cartProduct)
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      dispatch({
        type: types.ADD_PRODUCT_TO_CART,
        payload: updatedCart,
      })
    }
  }
}
export const addToProductQuantity = (id) => (dispatch) => {
  //cookie solution
  let cart = localStorage.getItem('cart')
  let parsedCart = JSON.parse(cart)
  //gets the index of where the product sits in the array
  let index = parsedCart.findIndex((item) => item.id === id)
  let updatedCart = parsedCart
  updatedCart[index].quantity = updatedCart[index].quantity + 1
  localStorage.setItem('cart', JSON.stringify(updatedCart))
  dispatch({
    type: types.ADD_TO_PRODUCT_QUANTITY,
    payload: updatedCart,
  })
}
export const removeFromProductQuantity = (id) => (dispatch) => {
  //cookie solution
  let cart = localStorage.getItem('cart')

  let parsedCart = JSON.parse(cart)
  // //gets the index of where the product sits in the array
  let index = parsedCart.findIndex((item) => item.id === id)
  let updatedCart = parsedCart
  updatedCart[index].quantity = updatedCart[index].quantity - 1
  //checks if the product need to be removed from the car if quantity is set to zero
  if (updatedCart[index].quantity === 0) {
    updatedCart = updatedCart.filter((item) => item.id !== id)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    dispatch({
      type: types.REMOVE_FROM_PRODUCT_QUANTITY,
      payload: updatedCart,
    })
  } else {
    // updatedCart[index].quantity = updatedCart[index].quantity - 1
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    dispatch({
      type: types.REMOVE_FROM_PRODUCT_QUANTITY,
      payload: updatedCart,
    })
  }
  // let updatedCart = parsedCart
}
export const proceedWithPurchase = (cart, totalPrice, orderHistoryLength) => (
  dispatch
) => {
  axios
    .post(
      '/api/users/purchase',

      { cart, totalPrice }
    )
    .then((res) => {
      dispatch(clearCart())
      dispatch(setLoggedUser(res.data))
    })
}
export const clearCart = () => (dispatch) => {
  //cookie solution
  let cart = localStorage.getItem('cart')

  if (cart !== null) {
    // console.log(cart)
    localStorage.removeItem('cart')
    let updatedCart = []
    dispatch({
      type: types.CLEAR_CART,
      payload: updatedCart,
    })
  }
}
