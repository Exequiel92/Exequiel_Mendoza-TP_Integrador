const express = require("express");
const router = express.Router();

const ModelLibro = require("../models/libros.model");

router.get("/", async (req, res) => {
  try {
    const libros = await ModelLibro.find();
    res.json(libros);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los libros" });
  }
});

router.get("/", async (req, res) => {
  const { autor, categoria, estado } = req.query;
  try {
    const filtro = {};
    if (autor) filtro.autor = autor;
    if (categoria) filtro.categoria = categoria;
    if (estado) filtro.estado = estado;

    const libros = await ModelLibro.find(filtro);

    if (!libros.length) {
      return res.status(404).json({ message: "No se encontraron libros" });
    }
    res.status(200).json(libros);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los libros" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const libro = await ModelLibro.findById(req.params.id);
    if (!libro) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
    res.status(200).json(libro);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el libro" });
  }
});

router.post("/", async (req, res) => {
  const body = req.body;
  try {
    const nuevoLibro = await ModelLibro.create(body);
    res.status(201).json(nuevoLibro);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el libro" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const libroActualizado = await ModelLibro.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!libroActualizado) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
    res.json(libroActualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el libro" });
  }
});

router.put("/:id/prestar", async (req, res) => {
  try {
    const libro = await ModelLibro.findById(req.params.id);
    if (!libro) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
    if (libro.estado === "Prestado") {
      return res.status(400).json({ message: "El libro no está disponible" });
    }
    libro.estado = "Prestado";
    libro.fechaPrestamo = new Date();
    libro.fechaDevolucion = new Date();
    libro.fechaDevolucion.setDate(libro.fechaDevolucion.getDate() + 14);
    await libro.save();
    res.status(200).json({ message: "Libro prestado con éxito", libro });
  } catch (error) {
    res.status(500).json({ message: "Error al prestar el libro" });
  }
});

router.put("/:id/devolver", async (req, res) => {
  try {
    const libro = await ModelLibro.findById(req.params.id);
    if (!libro) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
    if (libro.estado !== "Prestado") {
      return res.status(400).json({ message: "El libro no está prestado" });
    }
    libro.estado = "Disponible";
    libro.fechaPrestamo = null;
    libro.fechaDevolucion = null;
    await libro.save();
    res.status(200).json({ message: "Libro devuelto con éxito", libro });
  } catch (error) {
    res.status(500).json({ message: "Error al devolver el libro" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const libroEliminado = await ModelLibro.findByIdAndDelete(req.params.id);
    if (!libroEliminado) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
    res.status(200).json({
      message: "Libro eliminado correctamente",
      libro: libroEliminado,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el libro" });
  }
});

module.exports = router;
