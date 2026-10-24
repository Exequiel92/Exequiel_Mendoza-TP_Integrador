import {
  Accordion,
  Alert,
  Badge,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ManualUsuario.css";

const ManualUsuario = () => {
  return (
    <main className="manual-usuario">
      <Container className="py-4 py-lg-5">
        {/* Encabezado */}
        <header className="manual-usuario__cabecera">
          <Badge bg="light" text="primary" className="mb-3">
            GUÍA DE USO
          </Badge>

          <h1>Manual del Usuario</h1>

          <p>
            En esta guía encontrarás las indicaciones necesarias para utilizar
            la aplicación, consultar el catálogo y administrar los productos
            registrados.
          </p>

          <Link to="/productos" className="btn manual-usuario__boton">
            Ir a Productos
            <i className="bi bi-arrow-right ms-2" aria-hidden="true" />
          </Link>
        </header>

        {/* Resumen de funciones */}
        <section className="manual-usuario__resumen">
          <Row className="g-4">
            <Col md={4}>
              <Card className="manual-usuario__tarjeta h-100">
                <Card.Body>
                  <div className="manual-usuario__icono">
                    <i className="bi bi-search" aria-hidden="true" />
                  </div>

                  <Card.Title>Consultar productos</Card.Title>

                  <Card.Text>
                    Visualiza los productos registrados y consulta sus precios,
                    categorías, descripciones y cantidades disponibles.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="manual-usuario__tarjeta h-100">
                <Card.Body>
                  <div className="manual-usuario__icono">
                    <i className="bi bi-box-seam" aria-hidden="true" />
                  </div>

                  <Card.Title>Administrar el catálogo</Card.Title>

                  <Card.Text>
                    Registra nuevos productos o modifica la información de los
                    productos existentes.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="manual-usuario__tarjeta h-100">
                <Card.Body>
                  <div className="manual-usuario__icono">
                    <i className="bi bi-clipboard-check" aria-hidden="true" />
                  </div>

                  <Card.Title>Controlar el stock</Card.Title>

                  <Card.Text>
                    Consulta las cantidades disponibles y actualiza el stock
                    para mantener la información al día.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Instrucciones */}
        <section className="manual-usuario__instrucciones">
          <div className="manual-usuario__titulo-seccion">
            <span>INSTRUCCIONES</span>
            <h2>¿Cómo utilizar la aplicación?</h2>
            <p>
              Selecciona cada apartado para conocer el procedimiento
              correspondiente.
            </p>
          </div>

          <Accordion defaultActiveKey="0" className="manual-usuario__acordeon">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <i className="bi bi-grid me-2" aria-hidden="true" />
                1. Consultar el catálogo de productos
              </Accordion.Header>

              <Accordion.Body>
                <p>
                  Ingresa a la sección <strong>Productos</strong> desde la barra
                  de navegación. Allí encontrarás los productos registrados en
                  la aplicación.
                </p>

                <p>
                  Cada producto presenta su información principal, que incluye
                  el nombre, la descripción, la categoría, el precio y la
                  cantidad disponible. Cuando se haya registrado una imagen,
                  también podrás visualizarla.
                </p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <i className="bi bi-funnel me-2" aria-hidden="true" />
                2. Filtrar los productos
              </Accordion.Header>

              <Accordion.Body>
                <p>
                  Puedes utilizar los filtros disponibles en el catálogo para
                  encontrar productos según tus necesidades.
                </p>

                <ul>
                  <li>
                    <strong>Por categoría:</strong> permite consultar los
                    productos que pertenecen a una categoría determinada.
                  </li>

                  <li>
                    <strong>Por bajo stock:</strong> permite identificar los
                    productos cuyas cantidades se encuentran por debajo del
                    valor seleccionado.
                  </li>
                </ul>

                <p>
                  Para volver a consultar todos los productos, desactiva los
                  filtros aplicados, según las opciones disponibles en la
                  pantalla.
                </p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <i className="bi bi-plus-circle me-2" aria-hidden="true" />
                3. Registrar un nuevo producto
              </Accordion.Header>

              <Accordion.Body>
                <p>
                  Para incorporar un producto al catálogo, utiliza la opción
                  destinada a agregar un nuevo producto. Se abrirá un formulario
                  donde deberás completar los datos solicitados.
                </p>

                <p>Los campos contemplados por el formulario son:</p>

                <ul>
                  <li>
                    <strong>Nombre:</strong> identifica el producto.
                  </li>

                  <li>
                    <strong>Descripción:</strong> proporciona información
                    adicional sobre el producto.
                  </li>

                  <li>
                    <strong>Precio:</strong> indica su precio de venta.
                  </li>

                  <li>
                    <strong>Cantidad:</strong> indica las unidades disponibles.
                  </li>

                  <li>
                    <strong>Categoría:</strong> permite clasificar el producto.
                  </li>

                  <li>
                    <strong>Imagen:</strong> puedes proporcionar una URL de
                    imagen si deseas mostrar una fotografía del producto. Este
                    campo es opcional.
                  </li>
                </ul>

                <p>
                  Revisa la información antes de guardar. El formulario validará
                  los datos y señalará los campos que debas corregir.
                </p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <i className="bi bi-pencil-square me-2" aria-hidden="true" />
                4. Editar un producto
              </Accordion.Header>

              <Accordion.Body>
                <p>
                  Busca el producto que deseas modificar y selecciona su opción
                  de edición.
                </p>

                <p>
                  Se abrirá un formulario con la información registrada.
                  Modifica los campos necesarios y guarda los cambios para
                  actualizar el producto.
                </p>

                <p>
                  Antes de confirmar, verifica que los datos ingresados sean
                  correctos.
                </p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>
                <i className="bi bi-boxes me-2" aria-hidden="true" />
                5. Actualizar el stock
              </Accordion.Header>

              <Accordion.Body>
                <p>
                  El stock representa la cantidad disponible de cada producto.
                  Es importante mantener este dato actualizado.
                </p>

                <p>
                  Utiliza la opción de edición de stock disponible en el
                  catálogo para modificar las cantidades correspondientes.
                  Ingresa valores enteros iguales o superiores a cero y guarda
                  los cambios.
                </p>

                <Alert variant="info" className="mb-0">
                  <i className="bi bi-info-circle me-2" aria-hidden="true" />
                  Antes de guardar, comprueba que las cantidades ingresadas
                  coincidan con el stock que deseas registrar.
                </Alert>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">
              <Accordion.Header>
                <i className="bi bi-trash me-2" aria-hidden="true" />
                6. Eliminar un producto
              </Accordion.Header>

              <Accordion.Body>
                <p>
                  Localiza el producto que deseas quitar del catálogo y utiliza
                  la opción de eliminación correspondiente.
                </p>

                <Alert variant="warning" className="mb-0">
                  <i
                    className="bi bi-exclamation-triangle me-2"
                    aria-hidden="true"
                  />
                  Comprueba que hayas seleccionado el producto correcto antes de
                  eliminarlo.
                </Alert>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="6">
              <Accordion.Header>
                <i className="bi bi-image me-2" aria-hidden="true" />
                7. Agregar una imagen a un producto
              </Accordion.Header>

              <Accordion.Body>
                <p>
                  Durante el registro o la edición de un producto, puedes
                  ingresar una dirección web que apunte a su imagen.
                </p>

                <p>
                  Utiliza una URL completa que comience con{" "}
                  <code>https://</code> o <code>http://</code>. Si la dirección
                  es válida, el formulario mostrará una vista previa de la
                  imagen.
                </p>

                <p>
                  La imagen es opcional. Si no agregas una o no puede cargarse,
                  la aplicación mostrará el icono predeterminado.
                </p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="7">
              <Accordion.Header>
                <i className="bi bi-shield-check me-2" aria-hidden="true" />
                8. Recomendaciones generales
              </Accordion.Header>

              <Accordion.Body>
                <ul className="mb-0">
                  <li>
                    Verifica los precios y las cantidades antes de guardar.
                  </li>

                  <li>
                    Utiliza nombres y descripciones claros para identificar cada
                    producto.
                  </li>

                  <li>
                    Mantén actualizados los datos del catálogo y el stock.
                  </li>

                  <li>
                    Comprueba las direcciones de las imágenes si estas no se
                    visualizan correctamente.
                  </li>

                  <li>
                    Lee los mensajes de validación para corregir cualquier dato
                    que no cumpla los requisitos del formulario.
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </section>

        {/* Cierre */}
        <footer className="manual-usuario__pie">
          <div>
            <h3>¿Listo para comenzar?</h3>
            <p>
              Ingresa al catálogo para consultar y administrar los productos.
            </p>
          </div>

          <Link to="/productos" className="btn manual-usuario__boton">
            Ir a Productos
            <i className="bi bi-arrow-up-right ms-2" aria-hidden="true" />
          </Link>
        </footer>
      </Container>
    </main>
  );
};

export default ManualUsuario;
