import axios from "axios";
import type { Producto } from "../types/Producto";

const BASE_URL = "http://localhost:4000/productos";

export const obtenerProductos = async (): Promise<Producto[]> => {
  try {
    const respuesta = await axios.get(BASE_URL);
    return respuesta.data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
};
