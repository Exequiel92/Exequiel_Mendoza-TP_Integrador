import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const PaginaInicio = () => {
  return (
    <section className="py-5 bg-light">
      <Container className="py-5">
        <Row className="align-items-center g-4">
          <Col md={6}>
            <h1 className="display-5 fw-bold">Tienda</h1>
            <p className="lead text-secondary">
              Bienvenido a nuestra tienda en línea, donde encontrarás una amplia
              variedad de productos de alta calidad. Explora nuestra colección y
              descubre ofertas exclusivas que no querrás perderte.
            </p>
            <div className="d-flex gap-2">
              <Link to="/productos" className="btn btn-primary">
                Ver Productos
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PaginaInicio;
