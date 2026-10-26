require("dotenv").config();

const mongoose = require("mongoose");

let conexionEnCurso = null;

const dbconnect = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("La variable de entorno MONGO_URI no está configurada.");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!conexionEnCurso) {
    conexionEnCurso = mongoose
      .connect(mongoUri)
      .then(() => {
        console.log("Conexión exitosa a MongoDB Atlas");
        return mongoose.connection;
      })
      .catch((error) => {
        conexionEnCurso = null;
        throw error;
      });
  }

  return conexionEnCurso;
};

mongoose.connection.on("disconnected", () => {
  conexionEnCurso = null;
});

module.exports = dbconnect;
