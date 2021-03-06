import React, { Component } from 'react'
import axios from 'axios'
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import setUserToken from './utils/setUserToken'

import jwt_decode from 'jwt-decode'

import store from './store'

import Landing from './components/Landing/Landing'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Dashboard from './components/Auth/Dashboard'
import UserCart from './components/Auth/UserCart'
import DashboardAccount from './components/Auth/DashboardAccount'
import EditAccount from './components/Auth/EditAccount'
import ProductDetail from './components/Products/ProductDetail'
import ProductList from './components/Products/ProductList'

import Navigation from './components/Nav/Navigation'
import 'bootstrap/dist/css/bootstrap.min.css'
import { setLoggedUser, setProductCart } from './actions/userAuthActions'

if (localStorage.token) {
  setUserToken(localStorage.token)
  const decoded = jwt_decode(localStorage.token)

  // Set user and isAuthenticated
  store.dispatch(setLoggedUser(decoded))
}
if (localStorage.cart) {
  let cart = localStorage.cart
  store.dispatch(setProductCart(JSON.parse(cart)))
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navigation />
          <Switch>
            {/* <Route exact path="/" component={Landing} /> */}
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route
              exact
              path='/products/:id/detail'
              component={ProductDetail}
            />
            {/* <Route exact path="/products" component={ProductList} /> */}
            <Route exact path='/' component={ProductList} />
            <Route exact path='/cart' component={UserCart} />
            <Route
              exact
              path='/dashboard/account'
              component={DashboardAccount}
            />
            <Route exact path='/account/edit' component={EditAccount} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}
export default App
