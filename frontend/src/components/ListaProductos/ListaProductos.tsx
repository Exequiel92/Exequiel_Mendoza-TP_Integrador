import { useState, useEffect, useCallback } from "react";
import { Modal, Card, Row, Col, Button, Form } from "react-bootstrap";
import type { Producto, ProductoFormulario } from "../../types/Producto";

import {
  crearProducto,
  obtenerProductos,
  actualizarProducto,
  eliminarProducto,
  obtenerProductosPorCategoria,
  obtenerProductosBajoStock,
  actualizarStock,
} from "../../services/productoServicio";

import ModalProducto from "../ModalProducto/ModalProducto";
import "./ListaProductos.css";

type FiltroActivo = "todos" | "categoria" | "bajo-stock";

const formatoPrecio = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 2,
});

const ListaProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [productoEditado, setProductoEditado] = useState<Producto | null>(null);

  const [productoAEliminar, setProductoAEliminar] = useState<Producto | null>(
    null,
  );
  const [errorEliminar, setErrorEliminar] = useState<string | null>(null);

  // Filtros de negocio
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [umbralStock, setUmbralStock] = useState("5");
  const [filtroActivo, setFiltroActivo] = useState<FiltroActivo>("todos");

  // Edición del stock
  const [stockPendiente, setStockPendiente] = useState<Record<string, string>>(
    {},
  );

  const [guardandoStock, setGuardandoStock] = useState(false);
  const [mensajeStock, setMensajeStock] = useState<string | null>(null);
  const [errorStock, setErrorStock] = useState<string | null>(null);

  // Obtener categorías únicas a partir del catálogo completo
  const actualizarCategorias = (lista: Producto[]) => {
    const categoriasUnicas = Array.from(
      new Set(
        lista.map((producto) => producto.categoria.trim()).filter(Boolean),
      ),
    ).sort((a, b) => a.localeCompare(b, "es"));

    setCategorias(categoriasUnicas);
  };

  // Sincronizar los valores de stock de la interfaz
  const sincronizarStock = (lista: Producto[]) => {
    setStockPendiente(
      Object.fromEntries(
        lista.map((producto) => [producto._id, String(producto.cantidad)]),
      ),
    );
  };

  // Cargar todos los productos
  const mostrarTodos = useCallback(async () => {
    setCargando(true);
    setError(null);
    setMensajeStock(null);
    setErrorStock(null);

    try {
      const datos = await obtenerProductos();

      setProductos(datos);
      actualizarCategorias(datos);
      sincronizarStock(datos);

      setCategoriaSeleccionada("");
      setFiltroActivo("todos");
    } catch {
      setError("No se pudieron cargar los productos.");
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    void mostrarTodos();
  }, [mostrarTodos]);

  // Filtrar por categoría mediante el endpoint del backend
  const filtrarPorCategoria = async () => {
    if (!categoriaSeleccionada) {
      await mostrarTodos();
      return;
    }

    setCargando(true);
    setError(null);
    setMensajeStock(null);
    setErrorStock(null);

    try {
      const datos = await obtenerProductosPorCategoria(categoriaSeleccionada);

      setProductos(datos);
      sincronizarStock(datos);
      setFiltroActivo("categoria");
    } catch {
      setError("No se pudieron consultar los productos por categoría.");
    } finally {
      setCargando(false);
    }
  };

  // Filtrar por stock mediante el endpoint del backend
  const filtrarPorStock = async () => {
    const limite = Number(umbralStock);

    if (umbralStock.trim() === "" || !Number.isInteger(limite) || limite < 0) {
      setErrorStock("Ingresá una cantidad entera igual o mayor que cero.");
      setMensajeStock(null);
      return;
    }

    setCargando(true);
    setError(null);
    setMensajeStock(null);
    setErrorStock(null);

    try {
      const datos = await obtenerProductosBajoStock(limite);

      setProductos(datos);
      sincronizarStock(datos);
      setFiltroActivo("bajo-stock");
    } catch {
      setError("No se pudieron consultar los productos con bajo stock.");
    } finally {
      setCargando(false);
    }
  };

  // Determinar si un producto corresponde al filtro activo
  const coincideConFiltro = (producto: Producto): boolean => {
    if (filtroActivo === "categoria") {
      return producto.categoria === categoriaSeleccionada;
    }

    if (filtroActivo === "bajo-stock") {
      return producto.cantidad < Number(umbralStock);
    }

    return true;
  };

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

  // Crear o actualizar un producto
  const guardarProducto = async (datos: ProductoFormulario): Promise<void> => {
    if (productoEditado) {
      const actualizado = await actualizarProducto(productoEditado._id, datos);

      setProductos((anteriores) =>
        anteriores
          .map((producto) =>
            producto._id === actualizado._id ? actualizado : producto,
          )
          .filter(coincideConFiltro),
      );

      setStockPendiente((anterior) => ({
        ...anterior,
        [actualizado._id]: String(actualizado.cantidad),
      }));

      setCategorias((anteriores) =>
        Array.from(
          new Set([...anteriores, actualizado.categoria].filter(Boolean)),
        ).sort((a, b) => a.localeCompare(b, "es")),
      );
    } else {
      const nuevo = await crearProducto(datos);

      if (coincideConFiltro(nuevo)) {
        setProductos((anteriores) => [...anteriores, nuevo]);
      }

      setStockPendiente((anterior) => ({
        ...anterior,
        [nuevo._id]: String(nuevo.cantidad),
      }));

      setCategorias((anteriores) =>
        Array.from(
          new Set([...anteriores, nuevo.categoria].filter(Boolean)),
        ).sort((a, b) => a.localeCompare(b, "es")),
      );
    }

    cerrarModal();
  };

  // Cerrar el modal de eliminación
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

      setStockPendiente((anterior) => {
        const nuevo = { ...anterior };
        delete nuevo[productoAEliminar._id];
        return nuevo;
      });

      cerrarEliminar();
    } catch {
      setErrorEliminar("No se pudo eliminar el producto.");
    }
  };

  // Guardar los cambios de stock de todos los productos visibles
  const guardarCambiosStock = async () => {
    setMensajeStock(null);
    setErrorStock(null);

    const valoresInvalidos = productos.some((producto) => {
      const valor = stockPendiente[producto._id] ?? String(producto.cantidad);

      return (
        valor.trim() === "" ||
        !Number.isInteger(Number(valor)) ||
        Number(valor) < 0
      );
    });

    if (valoresInvalidos) {
      setErrorStock(
        "Las cantidades deben ser números enteros iguales o mayores que cero.",
      );
      return;
    }

    const cambios = productos.filter((producto) => {
      const valor = stockPendiente[producto._id] ?? String(producto.cantidad);

      return Number(valor) !== producto.cantidad;
    });

    if (cambios.length === 0) {
      setMensajeStock("No hay cambios de stock pendientes.");
      return;
    }

    setGuardandoStock(true);

    try {
      // El backend espera objetos con las propiedades id y cantidad.
      await actualizarStock(
        cambios.map((producto) => ({
          id: producto._id,
          cantidad: Number(stockPendiente[producto._id]),
        })),
      );

      const productosActualizados = productos.map((producto) => {
        const cambio = cambios.find((item) => item._id === producto._id);

        return cambio
          ? {
              ...producto,
              cantidad: Number(stockPendiente[producto._id]),
            }
          : producto;
      });

      setProductos(productosActualizados.filter(coincideConFiltro));
      sincronizarStock(productosActualizados);

      setMensajeStock(
        `Stock actualizado correctamente. Productos modificados: ${cambios.length}.`,
      );
    } catch {
      setErrorStock("No se pudo actualizar el stock de los productos.");
    } finally {
      setGuardandoStock(false);
    }
  };

  const hayCambiosStock = productos.some((producto) => {
    const valor = stockPendiente[producto._id] ?? String(producto.cantidad);

    return valor !== String(producto.cantidad);
  });

  return (
    <section className="lista-productos">
      {/* Encabezado del catálogo */}
      <div className="lista-productos__encabezado">
        <div>
          <span className="lista-productos__etiqueta">CATÁLOGO</span>

          <h2>Todos los productos</h2>

          <p>
            {productos.length === 1
              ? "1 producto en la vista actual"
              : `${productos.length} productos en la vista actual`}
          </p>
        </div>

        <div className="lista-productos__acciones-principales">
          <Button
            className="lista-productos__guardar-stock"
            onClick={guardarCambiosStock}
            disabled={!hayCambiosStock || guardandoStock || cargando}
          >
            <i className="bi bi-box-seam me-2" aria-hidden="true" />
            {guardandoStock ? "Guardando..." : "Guardar stock"}
          </Button>

          <Button className="lista-productos__agregar" onClick={abrirAgregar}>
            <i className="bi bi-plus-lg me-2" aria-hidden="true" />
            Agregar producto
          </Button>
        </div>
      </div>

      {/* Filtros de los endpoints de negocio */}
      <div className="lista-productos__filtros">
        <div className="lista-productos__filtro">
          <Form.Label htmlFor="filtro-categoria">
            Filtrar por categoría
          </Form.Label>

          <div className="lista-productos__control-filtro">
            <Form.Select
              id="filtro-categoria"
              value={categoriaSeleccionada}
              onChange={(evento) =>
                setCategoriaSeleccionada(evento.target.value)
              }
              disabled={cargando}
            >
              <option value="">Seleccioná una categoría</option>

              {categorias.map((categoria) => (
                <option value={categoria} key={categoria}>
                  {categoria}
                </option>
              ))}
            </Form.Select>

            <Button
              variant="outline-primary"
              onClick={filtrarPorCategoria}
              disabled={cargando || !categoriaSeleccionada}
              aria-label="Buscar por categoría"
              title="Buscar por categoría"
            >
              <i className="bi bi-funnel" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div className="lista-productos__filtro">
          <Form.Label htmlFor="filtro-stock">
            Consultar stock inferior a
          </Form.Label>

          <div className="lista-productos__control-filtro">
            <Form.Control
              id="filtro-stock"
              type="number"
              min={0}
              step={1}
              value={umbralStock}
              onChange={(evento) => setUmbralStock(evento.target.value)}
              disabled={cargando}
            />

            <Button
              variant="outline-primary"
              onClick={filtrarPorStock}
              disabled={cargando}
              aria-label="Consultar productos con bajo stock"
              title="Consultar productos con bajo stock"
            >
              <i className="bi bi-exclamation-triangle" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <Button
          variant="light"
          className="lista-productos__mostrar-todos"
          onClick={mostrarTodos}
          disabled={cargando}
        >
          <i className="bi bi-arrow-counterclockwise me-2" aria-hidden="true" />
          Mostrar todos
        </Button>
      </div>

      {/* Mensajes de actualización de stock */}
      {errorStock && (
        <div
          className="lista-productos__mensaje lista-productos__mensaje--error"
          role="alert"
        >
          <i className="bi bi-exclamation-circle me-2" aria-hidden="true" />
          {errorStock}
        </div>
      )}

      {mensajeStock && (
        <div
          className="lista-productos__mensaje lista-productos__mensaje--exito"
          role="status"
        >
          <i className="bi bi-check-circle me-2" aria-hidden="true" />
          {mensajeStock}
        </div>
      )}

      {/* Modal de creación y edición */}
      <ModalProducto
        mostrar={mostrarModal}
        producto={productoEditado}
        onCerrar={cerrarModal}
        onGuardar={guardarProducto}
      />

      {/* Modal de eliminación */}
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

      {/* Carga y errores generales */}
      {cargando && (
        <div className="lista-productos__estado" role="status">
          <span className="lista-productos__spinner" />
          <p>Consultando productos...</p>
        </div>
      )}

      {error && (
        <div
          className="lista-productos__estado lista-productos__estado--error"
          role="alert"
        >
          <i className="bi bi-exclamation-circle" aria-hidden="true" />
          <p>{error}</p>
        </div>
      )}

      {/* Catálogo vacío */}
      {!cargando && !error && productos.length === 0 && (
        <div className="lista-productos__estado lista-productos__vacio">
          <i
            className="bi bi-box-seam lista-productos__vacio-icono"
            aria-hidden="true"
          />

          <h3>
            {filtroActivo === "categoria"
              ? "No hay productos en esta categoría"
              : filtroActivo === "bajo-stock"
                ? "No hay productos con bajo stock"
                : "Tu catálogo está vacío"}
          </h3>

          <p>
            {filtroActivo === "todos"
              ? "Agregá tu primer producto para comenzar a organizar tu catálogo."
              : "Probá otro filtro o consultá el catálogo completo."}
          </p>

          {filtroActivo === "todos" ? (
            <Button className="lista-productos__agregar" onClick={abrirAgregar}>
              <i className="bi bi-plus-lg me-2" aria-hidden="true" />
              Agregar primer producto
            </Button>
          ) : (
            <Button variant="outline-primary" onClick={mostrarTodos}>
              Mostrar todos los productos
            </Button>
          )}
        </div>
      )}

      {/* Tarjetas */}
      {!cargando && !error && productos.length > 0 && (
        <Row className="lista-productos__grilla">
          {productos.map((producto) => (
            <Col xs={12} sm={6} xl={4} key={producto._id}>
              <Card className="producto-card h-100">
                <div className="producto-card__visual">
                  <span className="producto-card__categoria-visual">
                    {producto.categoria || "General"}
                  </span>

                  <div className="producto-card__icono" aria-hidden="true">
                    <i className="bi bi-box-seam" />
                  </div>

                  <span className="producto-card__referencia">PRODUCTO</span>
                </div>

                <Card.Body className="producto-card__cuerpo">
                  <div className="producto-card__meta">
                    <span className="producto-card__categoria">
                      {producto.categoria}
                    </span>

                    <span
                      className={`producto-card__stock ${
                        producto.cantidad > 0
                          ? "producto-card__stock--disponible"
                          : "producto-card__stock--agotado"
                      }`}
                    >
                      <span className="producto-card__stock-punto" />

                      {producto.cantidad > 0
                        ? `${producto.cantidad} disponibles`
                        : "Sin stock"}
                    </span>
                  </div>

                  <Card.Title className="producto-card__titulo">
                    {producto.nombre}
                  </Card.Title>

                  <Card.Text className="producto-card__descripcion">
                    {producto.descripcion || "Sin descripción disponible."}
                  </Card.Text>

                  <div className="producto-card__precio">
                    <span>Precio</span>

                    <strong>{formatoPrecio.format(producto.precio)}</strong>
                  </div>

                  {/* Editar el stock directamente desde la tarjeta */}
                  <div className="producto-card__stock-edicion">
                    <Form.Label htmlFor={`stock-${producto._id}`}>
                      Cantidad en stock
                    </Form.Label>

                    <Form.Control
                      id={`stock-${producto._id}`}
                      type="number"
                      min={0}
                      step={1}
                      size="sm"
                      value={
                        stockPendiente[producto._id] ??
                        String(producto.cantidad)
                      }
                      onChange={(evento) => {
                        setStockPendiente((anterior) => ({
                          ...anterior,
                          [producto._id]: evento.target.value,
                        }));

                        setMensajeStock(null);
                        setErrorStock(null);
                      }}
                      disabled={guardandoStock}
                    />
                  </div>

                  <div className="producto-card__acciones">
                    <Button
                      variant="outline-primary"
                      className="producto-card__boton producto-card__boton--editar"
                      onClick={() => abrirEditar(producto)}
                    >
                      <i className="bi bi-pencil me-2" aria-hidden="true" />
                      Editar
                    </Button>

                    <Button
                      variant="outline-danger"
                      className="producto-card__boton producto-card__boton--eliminar"
                      onClick={() => setProductoAEliminar(producto)}
                    >
                      <i className="bi bi-trash me-2" aria-hidden="true" />
                      Eliminar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </section>
  );
};

export default ListaProductos;
