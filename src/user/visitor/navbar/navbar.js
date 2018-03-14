import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import './navbar.css';

class VisitorNavbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Visitor</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/">
              Home
            </NavItem>
            <NavItem eventKey={2} href="login">
              Log In
            </NavItem>

            <NavItem eventKey={3} href="register">
              Register
            </NavItem>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default VisitorNavbar;