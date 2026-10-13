import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { ProductoFormulario } from "../../types/Producto";

type Props = {
  mostrar: boolean;
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
});

const valoresIniciales: ProductoFormulario = {
  nombre: "",
  descripcion: "",
  precio: 0,
  cantidad: 0,
  categoria: "",
};

const ModalProducto = ({ mostrar, onCerrar, onGuardar }: Props) => {
  const formik = useFormik<ProductoFormulario>({
    initialValues: valoresIniciales,
    validationSchema: esquema,
    onSubmit: async (valores, { resetForm, setStatus }) => {
      try {
        await onGuardar(valores);
        resetForm();
        onCerrar();
      } catch {
        setStatus(
          "Error al guardar el producto. Por favor, inténtelo de nuevo.",
        );
      }
    },
  });

  const cerrarModal = () => {
    formik.resetForm();
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

  return (
    <Modal show={mostrar} onHide={cerrarModal} centered>
      <Form onSubmit={formik.handleSubmit} noValidate>
        <Modal.Header closeButton>
          <Modal.Title>Agregar producto</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {campoTexto("nombre", "Producto")}
          {campoTexto("descripcion", "Descripción")}
          {campoNumero("precio", "Precio")}
          {campoNumero("cantidad", "Cantidad")}
          {campoTexto("categoria", "Categoría")}

          {formik.status && (
            <p className="text-danger mt-3 mb-0">{formik.status}</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button type="button" variant="secondary" onClick={cerrarModal}>
            Cancelar
          </Button>

          <Button type="submit" disabled={formik.isSubmitting}>
            Guardar producto
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalProducto;
