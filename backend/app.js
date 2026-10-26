const express = require("express");
const cors = require("cors");

const app = express();

const dbconnect = require("./config/db");
const productosRoutes = require("./routes/productos.routes");

app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await dbconnect();
    next();
  } catch (error) {
    next(error);
  }
});

app.use(productosRoutes);

app.use((error, req, res, next) => {
  console.error("Error en la API:", error.message);

  if (res.headersSent) {
    return next(error);
  }

  res.status(500).json({
    mensaje: "Error interno del servidor.",
  });
});

if (require.main === module) {
  const port = process.env.PORT || 4000;

  dbconnect()
    .then(() => {
      app.listen(port, () => {
        console.log(`Servidor escuchando en http://localhost:${port}`);
      });
    })
    .catch((error) => {
      console.error("No se pudo iniciar el servidor.", error);
      process.exit(1);
    });
}

module.exports = app;
