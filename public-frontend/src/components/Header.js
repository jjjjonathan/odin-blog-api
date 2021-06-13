import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

const Header = ({ user, handleLogout }) => {
  return (
    <Navbar bg="light" expand="sm">
      <Link to="/">
        <Navbar.Brand className="text-info">odinblog</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav" className="justify-content-end">
        <Nav>
          {user ? (
            <>
              <Nav.Item>
                <Navbar.Text className="mr-2">
                  Logged in as{' '}
                  <span className="text-dark">{user.username}</span>
                </Navbar.Text>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </Nav.Item>
            </>
          ) : (
            <>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/signup">
                  Sign Up
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
              </Nav.Item>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
