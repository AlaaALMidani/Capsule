import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FiBell } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../styles/logo.png';
import { NavLink } from 'react-router-dom';

function NavScrollExample() {
  return (
    <Navbar expand="lg" className="bg-transparent se">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            src={logo}
            alt="Logo"
            style={{ height: '50px' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mx-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavLink to={'/pharmacyHome'} style={({isActive})=>{return {color:isActive?"black":'white'}}}><a href="#action1" className="mx-3  hover:text-blue-500 transition-colors duration-200">Home</a></NavLink>
            <NavLink to={'/offers'} style={({isActive})=>{return {color:isActive?"black":'white'}}}><a href="#action2" className="mx-3 hover:text-blue-500 transition-colors duration-200">Offers</a></NavLink>
            <NavLink to={'/offers'} style={({isActive})=>{return {color:isActive?"black":'white'}}}><a href="/history" className="mx-3  hover:text-blue-500 transition-colors duration-200">History</a></NavLink> 
          </Nav>
          <Button variant="outline-success" className="d-flex align-items-center">
            <FiBell />
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;

