const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },

    descripcion: {
      type: String,
    },

    precio: {
      type: Number,
      required: true,
      min: 0,
    },

    cantidad: {
      type: Number,
      required: true,
      min: 0,
    },

    categoria: {
      type: String,
      required: true,
    },

    imagen: {
      type: String,
      trim: true,
      default: "",
    },

    fechaIngreso: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const ModelProducto = mongoose.model("productos", productoSchema);

module.exports = ModelProducto;
