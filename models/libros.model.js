const mongoose = require("mongoose");

const libroSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    categoria: { type: String, required: true },
    estado: {
      type: String,
      enum: ["Disponible", "Prestado", "Vencido"],
      default: "Disponible",
    },
    fechaPrestamo: { type: Date },
    fechaDevolucion: { type: Date },
  },
  { timestamps: true },
);

const ModelLibro = mongoose.model("libros", libroSchema);

module.exports = ModelLibro;
