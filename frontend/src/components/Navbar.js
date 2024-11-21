import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FiBell, FiLogOut } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../styles/logo.png";
import { NavLink } from "react-router-dom";
import { userType, UserTypes } from "../pages/login/Login";
import { useNavigate } from "react-router-dom";


const NavScrollExample = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    navigate("/login");
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className="bg-transparent"
      style={{
        backdropFilter: "blur(10px)",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        padding: "0 5%",
      }}>
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/home">
          <img src={logo} alt="Logo" style={{ height: "50px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Button
            variant="outline-light"
            className="d-flex align-items-center ms-3"
            style={{ backgroundColor: "#1b8942", border: "none" }}
            onClick={handleLogout}
          >
            <FiLogOut size={20} color="white" />
          </Button>
          <Nav className="mx-auto my-2 my-lg-0" navbarScroll>
            {userType === UserTypes.pharmacy && (
              <NavLink
                to="/home"
                className="mx-3 text-decoration-none h5 py-2 px-3"
                style={({ isActive }) => ({
                  color: isActive ? "#1b8942" : "#103758",
                  fontWeight: isActive ? "bold" : "normal",
                })}>
                Home
              </NavLink>
            )}
            {userType === UserTypes.client && (
              <NavLink
                to="/home"
                className="mx-3 text-decoration-none h5 py-2 px-3"
                style={({ isActive }) => ({
                  color: isActive ? "#1b8942" : "#103758",
                  fontWeight: isActive ? "bold" : "normal",
                })}>
                Home
              </NavLink>
            )}
            {userType === UserTypes.warehouse && (
              <NavLink
                to="/home"
                className="mx-3 text-decoration-none h5 py-2 px-3"
                style={({ isActive }) => ({
                  color: isActive ? "#1b8942" : "#103758",
                  fontWeight: isActive ? "bold" : "normal",
                })}>
                Home
              </NavLink>
            )}
            {userType == "DELIVERY" && (
              <NavLink
                to="/deliveryHome"
                className="mx-3 text-decoration-none h5 py-2 px-3"
                style={({ isActive }) => ({
                  color: isActive ? "#1b8942" : "#103758",
                  fontWeight: isActive ? "bold" : "normal",
                })}>
                Home
              </NavLink>
            )}
            {(userType === UserTypes.warehouse || userType === UserTypes.pharmacy) && (
              <>
                <NavLink
                  to="/myPosts"
                  className="mx-3 text-decoration-none h5 py-2 px-3"
                  style={({ isActive }) => ({
                    color: isActive ? "#1b8942" : "#103758",
                    fontWeight: isActive ? "bold" : "normal",
                  })}>
                  My Posts
                </NavLink>
                <NavLink
                  to="/orders"
                  className="mx-3 text-decoration-none h5 py-2 px-3"
                  style={({ isActive }) => ({
                    color: isActive ? "#1b8942" : "#103758",
                    fontWeight: isActive ? "bold" : "normal",
                  })}>
                  Customer Orders
                </NavLink>
              </>
            )}
            {(userType === UserTypes.client || userType === UserTypes.pharmacy) && (
              <NavLink
                to="/offers"
                className="mx-3 text-decoration-none h5 py-2 px-3"
                style={({ isActive }) => ({
                  color: isActive ? "#1b8942" : "#103758",
                  fontWeight: isActive ? "bold" : "normal",
                })}>
                Offers
              </NavLink>
            )}
            {userType !== UserTypes.warehouse && (
              <NavLink
                to="/history"
                className="mx-3 text-decoration-none h5 py-2 px-3"
                style={({ isActive }) => ({
                  color: isActive ? "#1b8942" : "#103758",
                  fontWeight: isActive ? "bold" : "normal",
                })}>
                History
              </NavLink>
            )}
          </Nav>
          <NavLink to="/notifications">
            <Button
              variant="outline-light"
              className="d-flex align-items-center ms-3"
              style={{ backgroundColor: "#1b8942", border: "none" }}>
              <FiBell />
            </Button>
          </NavLink>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavScrollExample;
