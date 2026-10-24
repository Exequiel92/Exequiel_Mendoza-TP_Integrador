const express = require("express");
const router = express.Router();

const ModelProducto = require("../models/productos.models");

const {
  validarDatosProducto,
  validarIdProducto,
  validarCategoria,
  validarCantidadStock,
  validarActualizacionStock,
} = require("../middlewares/validacionesProductos");

router.get("/productos", async (req, res) => {
  try {
    const productos = await ModelProducto.find();

    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los productos",
      error: error.message,
    });
  }
});

router.get(
  "/productos/categoria/:categoria",
  validarCategoria,
  async (req, res) => {
    try {
      const productos = await ModelProducto.find({
        categoria: req.params.categoria,
      });

      if (productos.length === 0) {
        return res.status(404).json({
          mensaje: "No hay productos para esa categoría.",
        });
      }

      res.status(200).json(productos);
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al buscar productos.",
        error: error.message,
      });
    }
  },
);

router.get(
  "/productos/bajo-stock/:cantidad",
  validarCantidadStock,
  async (req, res) => {
    try {
      const cantidad = Number(req.params.cantidad);

      const productos = await ModelProducto.find({
        cantidad: { $lt: cantidad },
      });

      if (productos.length === 0) {
        return res.status(404).json({
          mensaje: "No existen productos con bajo stock.",
        });
      }

      res.status(200).json(productos);
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al consultar el stock.",
        error: error.message,
      });
    }
  },
);

router.put(
  "/productos/actualizar-stock",
  validarActualizacionStock,
  async (req, res) => {
    try {
      const productos = req.body;

      const ids = productos.map((producto) => producto.id);

      const existentes = await ModelProducto.find({
        _id: { $in: ids },
      }).select("_id");

      const idsExistentes = new Set(
        existentes.map((producto) => producto._id.toString()),
      );

      const idsNoEncontrados = ids.filter((id) => !idsExistentes.has(id));

      if (idsNoEncontrados.length > 0) {
        return res.status(404).json({
          mensaje: "Uno o más productos no fueron encontrados.",
          idsNoEncontrados,
        });
      }

      for (const producto of productos) {
        await ModelProducto.findByIdAndUpdate(
          producto.id,
          {
            cantidad: producto.cantidad,
          },
          {
            runValidators: true,
          },
        );
      }

      res.status(200).json({
        mensaje: "Stock actualizado correctamente.",
        productosActualizados: productos.length,
      });
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al actualizar el stock.",
        error: error.message,
      });
    }
  },
);

router.get("/productos/:id", validarIdProducto, async (req, res) => {
  try {
    const producto = await ModelProducto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado",
      });
    }

    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener el producto",
      error: error.message,
    });
  }
});

router.post("/productos", validarDatosProducto, async (req, res) => {
  try {
    const producto = await ModelProducto.create(req.body);

    res.status(201).json(producto);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear el producto",
      error: error.message,
    });
  }
});

router.put(
  "/productos/:id",
  validarIdProducto,
  validarDatosProducto,
  async (req, res) => {
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
        return res.status(404).json({
          mensaje: "Producto no encontrado",
        });
      }

      res.status(200).json(producto);
    } catch (error) {
      res.status(400).json({
        mensaje: "Error al actualizar el producto",
        error: error.message,
      });
    }
  },
);

router.delete("/productos/:id", validarIdProducto, async (req, res) => {
  try {
    const producto = await ModelProducto.findByIdAndDelete(req.params.id);

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado",
      });
    }

    res.status(200).json({
      mensaje: "Producto eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el producto",
      error: error.message,
    });
  }
});

module.exports = router;
