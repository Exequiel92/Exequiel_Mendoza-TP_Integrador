const express = require("express");
const app = express();
const dbconnect = require("./config/db");

const librosRoutes = require("./routes/libros.routes");

app.use(express.json());

const router = express.Router();

app.use("/libros", librosRoutes);

app.get("/", (req, res) => {
  res.send("Bienvenidos a la API");
});

const PORT = process.env.PORT || 7000;

dbconnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar");
    process.exit(1);
  });
