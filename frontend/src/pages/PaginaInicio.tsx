import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./PaginaInicio.css";

const PaginaInicio = () => {
  return (
    <section className="inicio">
      <Container className="inicio__container">
        <Row className="align-items-center g-5">
          {/* Presentación */}
          <Col lg={7}>
            <div className="inicio__contenido">
              <div className="inicio__etiqueta">
                <span className="inicio__punto" />
                DESCUBRÍ ALGO NUEVO
              </div>

              <h1 className="inicio__titulo">
                Tu próxima gran elección
                <span> empieza acá.</span>
              </h1>

              <p className="inicio__descripcion">
                Explorá nuestro catálogo, conocé los detalles de cada artículo y
                consultá precios y disponibilidad antes de elegir.
              </p>

              <div className="inicio__acciones">
                <Link to="/productos" className="inicio__boton">
                  Explorar catálogo
                  <span aria-hidden="true">↗</span>
                </Link>

                <span className="inicio__ayuda">
                  Simple, claro y a tu ritmo.
                </span>
              </div>

              {/* Beneficios */}
              <div className="inicio__beneficios">
                <div className="inicio__beneficio">
                  <span className="inicio__beneficio-icono">01</span>
                  <div>
                    <strong>Detalles claros</strong>
                    <small>Conocé cada artículo</small>
                  </div>
                </div>

                <div className="inicio__beneficio">
                  <span className="inicio__beneficio-icono">02</span>
                  <div>
                    <strong>Precios visibles</strong>
                    <small>Elegí con información</small>
                  </div>
                </div>

                <div className="inicio__beneficio">
                  <span className="inicio__beneficio-icono">03</span>
                  <div>
                    <strong>Stock disponible</strong>
                    <small>Consultá existencias</small>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          {/* Ilustración decorativa */}
          <Col lg={5}>
            <div className="inicio__visual" aria-hidden="true">
              <div className="inicio__orb inicio__orb--uno" />
              <div className="inicio__orb inicio__orb--dos" />

              <div className="catalogo">
                <div className="catalogo__encabezado">
                  <span className="catalogo__marca">✦</span>
                  <span className="catalogo__etiqueta">TU CATÁLOGO</span>
                  <span className="catalogo__estado" />
                </div>

                <div className="catalogo__ilustracion">
                  <div className="catalogo__halo" />

                  <div className="catalogo__figura">
                    <span>+</span>
                  </div>

                  <span className="catalogo__destello catalogo__destello--uno">
                    ✦
                  </span>

                  <span className="catalogo__destello catalogo__destello--dos">
                    ✧
                  </span>
                </div>

                <div className="catalogo__contenido">
                  <span className="catalogo__subtitulo">
                    UN MUNDO POR EXPLORAR
                  </span>

                  <h2>Hay mucho por descubrir.</h2>

                  <p>
                    Encontrá opciones, compará detalles y elegí tu favorito.
                  </p>
                </div>

                <div className="catalogo__pie">
                  <span>Descubrí tu próximo favorito</span>
                  <span>↗</span>
                </div>
              </div>

              <div className="inicio__tarjeta-flotante">
                <span className="inicio__check">✓</span>

                <div>
                  <strong>Todo en un solo lugar</strong>
                  <small>Detalles, precios y stock</small>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PaginaInicio;
