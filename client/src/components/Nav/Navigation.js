import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setLoggedUser, logoutUser } from "../../actions/userAuthActions";
import "./style.css";
import {
  Nav,
  NavDropdown,
  Navbar,
  FormControl,
  Form,
  Button,
} from "react-bootstrap";
class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  onLogoutClick = () => {
    //dispatchs the logout function
    this.props.logoutUser();
  };
  render() {
    let { isAuthenticated, user, cart } = this.props.auth;
    // console.log(cart);

    let cartOutput = 0;
    if (cart === undefined || cart === null) {
      cartOutput = 0;
    } else {
      cartOutput = cart.reduce(
        (cartOutput, product) => cartOutput + product.quantity,
        0
      );

      // let quanityArray = cart.map((product) => {
      //   return product.quanity;
      // });
      // console.log(quanityArray);
      // let typeSet = new Set(typesArray);
      // let uniqueTypeArray = [...typeSet];
      //   cartOutput = cart.reduce();
      console.log(cartOutput);
    }

    //logged in and loggedout links
    const authLinks = (
      <Fragment>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="/cart">Cart {cartOutput}</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="/register">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Item>{cartOutput}</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Fragment>
    );
    const unAuthLinks = (
      <Fragment>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/register">Register</Nav.Link>
      </Fragment>
    );
    return (
      <Fragment>
        <Navbar className="navbar_background" expand="lg">
          <Navbar.Brand href={`/`}>AmaProd</Navbar.Brand>
          <Nav className="ml-auto">
            {isAuthenticated ? authLinks : unAuthLinks}
          </Nav>
        </Navbar>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, { logoutUser })(Navigation));
