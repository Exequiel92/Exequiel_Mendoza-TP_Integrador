import { Container, Row, Col } from "react-bootstrap";
import BotonColor from "../BotonColor/BotonColor";

const SeccionHero = () => {
  return (
    <section id="Inicio" className="py-5 bg-light">
      <Container className="py-5">
        <Row className="align-items-center g-4">
          <Col md={6}>
            <h1 className="display-5">Pilar Tecno</h1>
            <p className="lead text-secondary">Bienvenido al curso de React</p>
            <BotonColor />
          </Col>
          <Col md={6}></Col>
        </Row>
      </Container>
    </section>
  );
};

export default SeccionHero;
