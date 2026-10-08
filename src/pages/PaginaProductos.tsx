import { Container } from "react-bootstrap";
import ListaProductos from "../components/ListaProductos/ListaProductos";

const PaginaProductos = () => {
  return (
    <Container className="py-5">
      <h1>Productos</h1>
      <ListaProductos />
    </Container>
  );
};

export default PaginaProductos;
