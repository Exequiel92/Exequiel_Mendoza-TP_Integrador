const { body, param, validationResult } = require("express-validator");

// Middleware para responder cuando hay errores de validación
const validarResultado = (req, res, next) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      mensaje: "Error de validación",
      errores: errores.array().map((error) => ({
        campo: error.path,
        mensaje: error.msg,
      })),
    });
  }

  next();
};

const validarDatosProducto = [
  body("nombre")
    .isString()
    .withMessage("El nombre debe ser un texto.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio."),

  body("descripcion")
    .isString()
    .withMessage("La descripción debe ser un texto.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("La descripción es obligatoria."),

  body("precio")
    .exists({ values: "null" })
    .withMessage("El precio es obligatorio.")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("El precio debe ser un número mayor o igual a cero.")
    .toFloat(),

  body("cantidad")
    .exists({ values: "null" })
    .withMessage("La cantidad es obligatoria.")
    .bail()
    .isInt({ min: 0 })
    .withMessage("La cantidad debe ser un entero mayor o igual a cero.")
    .toInt(),

  body("categoria")
    .isString()
    .withMessage("La categoría debe ser un texto.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("La categoría es obligatoria."),

  validarResultado,
];

const validarIdProducto = [
  param("id")
    .isMongoId()
    .withMessage("El identificador del producto no es válido."),

  validarResultado,
];

const validarCategoria = [
  param("categoria")
    .trim()
    .notEmpty()
    .withMessage("La categoría es obligatoria."),

  validarResultado,
];

const validarCantidadStock = [
  param("cantidad")
    .isInt({ min: 0 })
    .withMessage("La cantidad debe ser un número entero mayor o igual a cero.")
    .toInt(),

  validarResultado,
];

const validarActualizacionStock = [
  body()
    .isArray({ min: 1 })
    .withMessage("Debe enviar un arreglo con al menos un producto."),

  body("*.id")
    .isMongoId()
    .withMessage("Cada producto debe tener un identificador válido."),

  body("*.cantidad")
    .isInt({ min: 0 })
    .withMessage("Cada cantidad debe ser un entero mayor o igual a cero.")
    .toInt(),

  validarResultado,
];

module.exports = {
  validarDatosProducto,
  validarIdProducto,
  validarCategoria,
  validarCantidadStock,
  validarActualizacionStock,
};
