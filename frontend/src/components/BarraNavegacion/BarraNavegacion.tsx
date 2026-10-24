import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./BarraNavegacion.css";

const BarraNavegacion = () => {
  return (
    <Navbar
      variant="dark"
      expand="lg"
      sticky="top"
      className="barra-navegacion shadow-sm py-3"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          Inicio
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navegacion-principal" />

        <Navbar.Collapse id="navegacion-principal">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/manual-usuario">
              Manual del Usuario
            </Nav.Link>

            <Nav.Link as={Link} to="/productos">
              Productos
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BarraNavegacion;
