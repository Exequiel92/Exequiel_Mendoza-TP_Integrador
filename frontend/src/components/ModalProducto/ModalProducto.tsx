import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { Producto, ProductoFormulario } from "../../types/Producto";
import "./ModalProducto.css";

type Props = {
  mostrar: boolean;
  producto: Producto | null;
  onCerrar: () => void;
  onGuardar: (producto: ProductoFormulario) => void | Promise<void>;
};

const esquema = Yup.object({
  nombre: Yup.string().trim().required("El nombre es obligatorio"),

  descripcion: Yup.string().trim().required("La descripción es obligatoria"),

  precio: Yup.number()
    .transform((valor, valorOriginal) =>
      valorOriginal === "" ? undefined : valor,
    )
    .required("El precio es obligatorio")
    .min(0, "El precio no puede ser negativo"),

  cantidad: Yup.number()
    .required("La cantidad es obligatoria")
    .integer("La cantidad debe ser un número entero")
    .min(0, "La cantidad no puede ser negativa"),

  categoria: Yup.string().trim().required("La categoría es obligatoria"),

  imagen: Yup.string()
    .trim()
    .test(
      "url-imagen",
      "Ingresá una URL válida que comience con http:// o https://",
      (valor) => {
        if (!valor) return true;

        try {
          const url = new URL(valor);

          return (
            ["http:", "https:"].includes(url.protocol) && Boolean(url.hostname)
          );
        } catch {
          return false;
        }
      },
    ),
});

const valoresIniciales: ProductoFormulario = {
  nombre: "",
  descripcion: "",
  precio: 0,
  cantidad: 0,
  categoria: "",
  imagen: "",
};

const ModalProducto = ({ mostrar, producto, onCerrar, onGuardar }: Props) => {
  const [errorVistaPrevia, setErrorVistaPrevia] = useState(false);

  const formik = useFormik<ProductoFormulario>({
    initialValues: producto
      ? {
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          cantidad: producto.cantidad,
          categoria: producto.categoria,
          imagen: producto.imagen ?? "",
        }
      : valoresIniciales,

    enableReinitialize: true,
    validationSchema: esquema,

    onSubmit: async (valores, { resetForm, setStatus }) => {
      try {
        const datosProducto: ProductoFormulario = {
          ...valores,
          imagen: valores.imagen?.trim() ?? "",
        };

        await onGuardar(datosProducto);

        resetForm();
        onCerrar();
      } catch {
        setStatus(
          "Error al guardar el producto. Por favor, inténtelo de nuevo.",
        );
      }
    },
  });

  useEffect(() => {
    setErrorVistaPrevia(false);
  }, [mostrar, producto?._id]);

  const cerrarModal = () => {
    formik.resetForm();
    setErrorVistaPrevia(false);
    onCerrar();
  };

  const campoTexto = (
    nombre: "nombre" | "descripcion" | "categoria",
    etiqueta: string,
  ) => {
    const propiedadesCampo = {
      name: nombre,
      value: formik.values[nombre],
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      isInvalid: !!(formik.touched[nombre] && formik.errors[nombre]),
    };

    return (
      <Form.Group className="mb-3" controlId={nombre}>
        <Form.Label>{etiqueta}</Form.Label>

        {nombre === "descripcion" ? (
          <Form.Control {...propiedadesCampo} as="textarea" rows={3} />
        ) : (
          <Form.Control {...propiedadesCampo} />
        )}

        <Form.Control.Feedback type="invalid">
          {formik.errors[nombre]}
        </Form.Control.Feedback>
      </Form.Group>
    );
  };

  const campoNumero = (nombre: "precio" | "cantidad", etiqueta: string) => (
    <Form.Group className="mb-3" controlId={nombre}>
      <Form.Label>{etiqueta}</Form.Label>

      <Form.Control
        type="number"
        name={nombre}
        min={0}
        step={nombre === "cantidad" ? 1 : "any"}
        value={formik.values[nombre]}
        onChange={(evento) => {
          const valor = evento.target.value;

          formik.setFieldValue(nombre, valor === "" ? "" : Number(valor));
        }}
        onBlur={formik.handleBlur}
        isInvalid={!!(formik.touched[nombre] && formik.errors[nombre])}
      />

      <Form.Control.Feedback type="invalid">
        {formik.errors[nombre]}
      </Form.Control.Feedback>
    </Form.Group>
  );

  const urlImagen = formik.values.imagen?.trim() ?? "";

  return (
    <Modal show={mostrar} onHide={cerrarModal} centered>
      <Form onSubmit={formik.handleSubmit} noValidate>
        <Modal.Header closeButton>
          <Modal.Title>
            {producto ? "Editar producto" : "Agregar producto"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {campoTexto("nombre", "Producto")}
          {campoTexto("descripcion", "Descripción")}
          {campoNumero("precio", "Precio")}
          {campoNumero("cantidad", "Cantidad")}
          {campoTexto("categoria", "Categoría")}

          {/* Imagen opcional */}
          <Form.Group className="mb-3" controlId="imagen">
            <Form.Label>Imagen (URL)</Form.Label>

            <Form.Control
              type="url"
              name="imagen"
              placeholder="https://ejemplo.com/imagen.jpg"
              value={formik.values.imagen ?? ""}
              onChange={(evento) => {
                setErrorVistaPrevia(false);
                formik.handleChange(evento);
              }}
              onBlur={formik.handleBlur}
              isInvalid={!!(formik.touched.imagen && formik.errors.imagen)}
            />

            <Form.Text className="text-muted">
              Opcional. Pegá la dirección web de una imagen del producto.
            </Form.Text>

            <Form.Control.Feedback type="invalid">
              {formik.errors.imagen}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Vista previa */}
          <div className="producto-imagen-preview">
            <span className="producto-imagen-preview__titulo">
              Vista previa
            </span>

            {urlImagen && !errorVistaPrevia ? (
              <img
                key={urlImagen}
                className="producto-imagen-preview__imagen"
                src={urlImagen}
                alt={`Vista previa de ${formik.values.nombre || "producto"}`}
                onError={() => setErrorVistaPrevia(true)}
              />
            ) : (
              <div className="producto-imagen-preview__vacia">
                {urlImagen && errorVistaPrevia ? (
                  <>
                    <i
                      className="bi bi-exclamation-circle"
                      aria-hidden="true"
                    />
                    <span>No se pudo cargar la imagen.</span>
                  </>
                ) : (
                  <>
                    <i className="bi bi-box-seam" aria-hidden="true" />
                    <span>Este producto no tiene imagen.</span>
                  </>
                )}
              </div>
            )}
          </div>

          {formik.status && (
            <p className="text-danger mt-3 mb-0">{formik.status}</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button type="button" variant="secondary" onClick={cerrarModal}>
            Cancelar
          </Button>

          <Button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Guardando..." : "Guardar producto"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalProducto;
