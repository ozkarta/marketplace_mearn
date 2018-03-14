import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import './navbar.css';

class SellerNavbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Seller</a>
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

                    <Nav pullRight>
                        <NavDropdown eventKey={4} title="Ozbegi Kartvelishvili" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Account</MenuItem>
                            <MenuItem eventKey={3.2}>Profile</MenuItem>

                            <MenuItem divider />
                            <MenuItem eventKey={3.3}>Log Out</MenuItem>
                        </NavDropdown>
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default SellerNavbar;