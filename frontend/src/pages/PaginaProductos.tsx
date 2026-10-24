import { Container } from "react-bootstrap";
import ListaProductos from "../components/ListaProductos/ListaProductos";
import "./PaginaProductos.css";

const PaginaProductos = () => {
  return (
    <main className="pagina-productos">
      <Container className="pagina-productos__container">
        <header className="pagina-productos__hero">
          <span className="pagina-productos__etiqueta">
            <span className="pagina-productos__punto" />
            TU CATÁLOGO, EN UN SOLO LUGAR
          </span>

          <h1>
            Organizá tus productos.
            <span> Simplificá tu gestión.</span>
          </h1>

          <p>
            Consultá precios, revisá existencias y administrá tu catálogo desde
            un mismo lugar.
          </p>
        </header>

        <ListaProductos />
      </Container>
    </main>
  );
};

export default PaginaProductos;
