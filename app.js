const express = require("express");
const app = express();

const dbconnect = require("./config/db");
const productosRoutes = require("./routes/productos");

const port = 4000;

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
