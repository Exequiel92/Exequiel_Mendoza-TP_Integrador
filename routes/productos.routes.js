const express = require("express");
const router = express.Router();

const ModelProducto = require("../models/productos.models");

// Obtener todos los productos
router.get("/productos", async (req, res) => {
  try {
    const productos = await ModelProducto.find();
    res.status(200).send(productos);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al obtener los productos",
      error,
    });
  }
});

// Obtener un producto por ID
router.get("/productos/:id", async (req, res) => {
  try {
    const producto = await ModelProducto.findById(req.params.id);

    if (!producto) {
      return res.status(404).send({
        mensaje: "Producto no encontrado",
      });
    }

    res.status(200).send(producto);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al obtener el producto",
      error,
    });
  }
});

// Crear producto
router.post("/productos", async (req, res) => {
  try {
    const producto = await ModelProducto.create(req.body);
    res.status(201).send(producto);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Actualizar producto
router.put("/productos/:id", async (req, res) => {
  try {
    const producto = await ModelProducto.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!producto) {
      return res.status(404).send({
        mensaje: "Producto no encontrado",
      });
    }

    res.status(200).send(producto);
  } catch (error) {
    res.status(400).send({
      mensaje: "Error al actualizar el producto",
      error,
    });
  }
});

// Eliminar producto
router.delete("/productos/:id", async (req, res) => {
  try {
    const producto = await ModelProducto.findByIdAndDelete(req.params.id);

    if (!producto) {
      return res.status(404).send({
        mensaje: "Producto no encontrado",
      });
    }

    res.status(200).send({
      mensaje: "Producto eliminado correctamente",
    });
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al eliminar el producto",
      error,
    });
  }
});

// Actualizar stock de varios productos
router.put("/productos/actualizar-stock", async (req, res) => {
  try {
    const productos = req.body;

    if (!Array.isArray(productos)) {
      return res.status(400).send({
        mensaje: "Debe enviar un arreglo de productos.",
      });
    }

    for (const producto of productos) {
      await ModelProducto.findByIdAndUpdate(producto.id, {
        cantidad: producto.cantidad,
      });
    }

    res.status(200).send({
      mensaje: "Stock actualizado correctamente.",
    });
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al actualizar el stock.",
      error,
    });
  }
});

// Obtener productos por categoría
router.get("/productos/categoria/:categoria", async (req, res) => {
  try {
    const productos = await ModelProducto.find({
      categoria: req.params.categoria,
    });

    if (productos.length === 0) {
      return res.status(404).send({
        mensaje: "No hay productos para esa categoría.",
      });
    }

    res.status(200).send(productos);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al buscar productos.",
      error,
    });
  }
});

// Productos con bajo stock
router.get("/productos/bajo-stock/:cantidad", async (req, res) => {
  try {
    const cantidad = Number(req.params.cantidad);

    const productos = await ModelProducto.find({
      cantidad: { $lt: cantidad },
    });

    if (productos.length === 0) {
      return res.status(404).send({
        mensaje: "No existen productos con bajo stock.",
      });
    }

    res.status(200).send(productos);
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al consultar el stock.",
      error,
    });
  }
});

module.exports = router;
