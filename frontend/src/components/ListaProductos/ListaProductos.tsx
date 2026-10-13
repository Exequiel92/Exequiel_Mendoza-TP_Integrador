import { useState, useEffect } from "react";
import { Modal, Card, Row, Col, Badge, Button } from "react-bootstrap";
import type { Producto, ProductoFormulario } from "../../types/Producto";
import {
  crearProducto,
  obtenerProductos,
  actualizarProducto,
  eliminarProducto,
} from "../../services/productoServicio";
import ModalProducto from "../ModalProducto/ModalProducto";

const ListaProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [productoEditado, setProductoEditado] = useState<Producto | null>(null);

  const [productoAEliminar, setProductoAEliminar] = useState<Producto | null>(
    null,
  );
  const [errorEliminar, setErrorEliminar] = useState<string | null>(null);

  // Obtener los productos al cargar el componente
  useEffect(() => {
    obtenerProductos()
      .then(setProductos)
      .catch(() => setError("No se pudieron cargar los productos"))
      .finally(() => setCargando(false));
  }, []);

  // Abrir el modal para agregar un producto
  const abrirAgregar = () => {
    setProductoEditado(null);
    setMostrarModal(true);
  };

  // Abrir el modal para editar un producto
  const abrirEditar = (producto: Producto) => {
    setProductoEditado(producto);
    setMostrarModal(true);
  };

  // Cerrar el modal de agregar o editar
  const cerrarModal = () => {
    setMostrarModal(false);
    setProductoEditado(null);
  };

  // Crear un producto nuevo o actualizar uno existente
  const guardarProducto = async (datos: ProductoFormulario): Promise<void> => {
    if (productoEditado) {
      const actualizado = await actualizarProducto(productoEditado._id, datos);

      setProductos((anteriores) =>
        anteriores.map((producto) =>
          producto._id === actualizado._id ? actualizado : producto,
        ),
      );
    } else {
      const nuevo = await crearProducto(datos);

      setProductos((anteriores) => [...anteriores, nuevo]);
    }

    cerrarModal();
  };

  // Cerrar el modal de eliminación y limpiar sus errores
  const cerrarEliminar = () => {
    setProductoAEliminar(null);
    setErrorEliminar(null);
  };

  // Eliminar el producto seleccionado
  const confirmarEliminar = async () => {
    if (!productoAEliminar) return;

    try {
      await eliminarProducto(productoAEliminar._id);

      setProductos((anteriores) =>
        anteriores.filter((producto) => producto._id !== productoAEliminar._id),
      );

      cerrarEliminar();
    } catch {
      setErrorEliminar("No se pudo eliminar el producto");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Productos</h2>

        <Button onClick={abrirAgregar}>Agregar producto</Button>
      </div>

      <ModalProducto
        mostrar={mostrarModal}
        producto={productoEditado}
        onCerrar={cerrarModal}
        onGuardar={guardarProducto}
      />

      <Modal show={!!productoAEliminar} onHide={cerrarEliminar} centered>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar producto</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          ¿Seguro que querés eliminar el producto "{productoAEliminar?.nombre}"?
          {errorEliminar && (
            <p className="text-danger mt-3 mb-0">{errorEliminar}</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarEliminar}>
            Cancelar
          </Button>

          <Button variant="danger" onClick={confirmarEliminar}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {cargando && <p>Cargando productos...</p>}

      {error && <p className="text-danger">{error}</p>}

      {!cargando && !error && productos.length === 0 && (
        <p>No hay productos registrados.</p>
      )}

      {!cargando && !error && productos.length > 0 && (
        <Row>
          {productos.map((producto) => (
            <Col md={4} key={producto._id}>
              <Card className="mb-3 h-100">
                <Card.Body>
                  <Card.Title>{producto.nombre}</Card.Title>

                  <Card.Subtitle className="text-secondary mb-2">
                    {producto.categoria} — Precio: ${producto.precio}
                  </Card.Subtitle>

                  <Card.Text>{producto.descripcion}</Card.Text>

                  <Badge bg={producto.cantidad > 0 ? "success" : "secondary"}>
                    Stock: {producto.cantidad} unidades
                  </Badge>

                  <div className="mt-3 d-flex gap-2">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => abrirEditar(producto)}
                    >
                      Editar
                    </Button>

                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => setProductoAEliminar(producto)}
                    >
                      Eliminar
                    </Button>
                  </div>
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
