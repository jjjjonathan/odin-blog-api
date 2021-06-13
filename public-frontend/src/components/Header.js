import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

const Header = ({ user }) => {
  return (
    <Navbar bg="light" expand="sm">
      <Link to="/">
        <Navbar.Brand>odinblog</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav" className="justify-content-between">
        <Nav variant="pills">
          <Nav.Item>
            <Nav.Link as={NavLink} exact to="/">
              Home
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Nav variant="pills">
          {user ? (
            <>
              <Nav.Item>
                <Navbar.Text>Logged in as _____</Navbar.Text>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/logout">
                  Logout
                </Nav.Link>
              </Nav.Item>
            </>
          ) : (
            <Nav.Item>
              <Nav.Link as={NavLink} to="/login">
                Login
              </Nav.Link>
            </Nav.Item>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
