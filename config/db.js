const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/GestorLibros", {});
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
