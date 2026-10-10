const express = require("express");
const cors = require("cors");

const app = express();

const dbconnect = require("./config/db");
const productosRoutes = require("./routes/productos.routes");

const port = 4000;

app.use(cors());
app.use(express.json());

app.use(productosRoutes);

dbconnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("No se pudo iniciar el servidor.", error);
  });

module.exports = app;
