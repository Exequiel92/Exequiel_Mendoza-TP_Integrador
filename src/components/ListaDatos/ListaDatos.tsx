import { useState, useEffect } from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import axios from "axios";
import type { Producto } from "../../types/Producto";

const ListaDatos = () => {
  const [datos, setDatos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/productos")
      .then((respuesta) => {
        setDatos(respuesta.data);
        // setCargando(false);
      })
      .catch((error) => {
        setError("Error al obtener los datos: " + error.message);
        setCargando(false);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Row>
      {datos.map((item) => (
        <Col md={4} key={item._id}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>{item.nombre}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ListaDatos;
