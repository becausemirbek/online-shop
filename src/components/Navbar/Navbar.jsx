import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// custom imports
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../contexts/authContext';


function NavScrollExample() {
  const [currentUser, setCurrentUser] = useState('');
  const isAdmin = currentUser === 'mirbek@gmail.com';
  const navigate = useNavigate();
  const { handleLogout } = useContext(authContext);
  
  useEffect(() => {
    const user = localStorage.getItem('email');
    setCurrentUser(user)
  }, [])

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">React&Backend</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link>Home</Nav.Link>
            {/* for product */}
            <NavDropdown title="Product" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={() => navigate('/products')}>Product List</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/create-product')}>Add Product</NavDropdown.Item>
            </NavDropdown>
            {/* for user */}
            <NavDropdown title="Account" id="navbarScrollingDropdown">
              {
                !currentUser ? (
                  <>
                    <NavDropdown.Item>Register</NavDropdown.Item>
                    <NavDropdown.Item>Login</NavDropdown.Item>
                  </>
                ) : (
                  null
                )
              }
              {isAdmin && <NavDropdown.Item onClick={() => navigate('/user-products')}>My products</NavDropdown.Item>}
              <NavDropdown.Item onClick={() => handleLogout(navigate)}>Logout</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href='#' disabled>
              {currentUser ? currentUser : 'No auth user'}
            </Nav.Link>
            <Nav.Link href='#'>
              <Link to="/create-category">Create category</Link>
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;