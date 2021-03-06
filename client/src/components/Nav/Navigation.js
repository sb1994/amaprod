import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setLoggedUser, logoutUser } from '../../actions/userAuthActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './style.css'
import { Nav, Navbar } from 'react-bootstrap'
class Navigation extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }
  handleUserLogout = (e) => {
    e.preventDefault()
    //dispatchs the logout function
    this.props.logoutUser()
    this.props.setLoggedUser({})
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
            <Nav.Link href='/dashboard'>
              <img
                src={user.profile_pic}
                alt='Profile Pic'
                className='rounded-circle img-fluid'
                style={{ height: '35px' }}
              />
            </Nav.Link>
            <Nav.Link href='/cart' className='mt-1'>
              <span>
                <FontAwesomeIcon icon={faShoppingCart} size='lg' /> {cartOutput}
              </span>
            </Nav.Link>
            <Nav.Item onClick={this.handleUserLogout} className='mt-1'>
              <span>Logout</span>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Fragment>
    )
    const unAuthLinks = (
      <Fragment>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='/login'>Login</Nav.Link>
            <Nav.Link href='/register'>Register</Nav.Link>
            <Nav.Link href='/cart' className='mt-1'>
              <span>
                <FontAwesomeIcon icon={faShoppingCart} size='lg' /> {cartOutput}
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
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

export default withRouter(
  connect(mapStateToProps, { logoutUser, setLoggedUser })(Navigation)
)
