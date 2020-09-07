import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setLoggedUser, logoutUser } from '../../actions/userAuthActions'
import './style.css'
import {
  Nav,
  NavDropdown,
  Navbar,
  FormControl,
  Form,
  Button,
} from 'react-bootstrap'
class Navigation extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }
  onLogoutClick = () => {
    //dispatchs the logout function
    this.props.logoutUser()
  }
  render() {
    let { isAuthenticated, user, cart } = this.props.auth
    // console.log(cart);

    let cartOutput = 0
    if (cart === undefined || cart === null) {
      cartOutput = 0
    } else {
      cartOutput = cart.reduce(
        (cartOutput, product) => cartOutput + product.quantity,
        0
      )
    }

    //logged in and loggedout links
    const authLinks = (
      <Fragment>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#home'>Home</Nav.Link>
            <Nav.Link href='/cart'>Cart {cartOutput}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Fragment>
    )
    const unAuthLinks = (
      <Fragment>
        <Nav.Link href='/login'>Login</Nav.Link>
        <Nav.Link href='/register'>Register</Nav.Link>
      </Fragment>
    )
    return (
      <Fragment>
        <Navbar className='navbar_background' expand='lg'>
          <Navbar.Brand href={`/`}>AmaProd</Navbar.Brand>
          <Nav className='ml-auto'>
            {isAuthenticated ? authLinks : unAuthLinks}
          </Nav>
        </Navbar>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default withRouter(connect(mapStateToProps, { logoutUser })(Navigation))
