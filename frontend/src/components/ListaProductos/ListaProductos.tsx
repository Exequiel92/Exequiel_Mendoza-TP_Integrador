import { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import type { Producto } from "../../types/Producto";
import { obtenerProductos } from "../../services/productoServicio";

const ListaProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    obtenerProductos()
      .then(setProductos)
      .catch(() => setError("Error al obtener los productos"))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h2 className="mb-3">Lista de Productos</h2>
      {cargando && <p>Cargando datos...</p>}
      {error && <p>{error}</p>}

      {!cargando && !error && (
        <Row>
          {productos.map((producto) => (
            <Col mb={3} key={producto._id}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>{producto.nombre}</Card.Title>
                  <Card.Subtitle>{producto.precio}</Card.Subtitle>
                  <Card.Text>{producto.descripcion}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default ListaProductos;
