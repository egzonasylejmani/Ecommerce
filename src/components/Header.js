import { useLocalStorage } from "@uidotdev/usehooks";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Header() {
  const [cart, setCart] = useLocalStorage("cart");
  const [user, setUser] = useLocalStorage("loggedin");

  const handleLogout = (e) => {
    e.preventDefault();
    setUser(undefined);
    window.location.href = "http://localhost:3000/";
  };

  return (
    <Navbar expand="lg" className="dark">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/electronics">Electronics</Nav.Link>
            <Nav.Link href="/jewerly">Jewelery</Nav.Link>
            <Nav.Link href="/mens">Men's wear</Nav.Link>
            <Nav.Link href="/womens">Woman's wear</Nav.Link>
            <NavDropdown
              title={user ? user.fullname : "Guest"}
              id="basic-nav-dropdown"
            >
              {user != undefined ? (
                <>
                  <NavDropdown.Item href="/favourites">
                  Favourites
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/cart">
                  Cart
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/addproduct">
                  AddProduct
                  </NavDropdown.Item>
                  
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#" onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                  <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                </>
              )}
            </NavDropdown>
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

export default Header;
