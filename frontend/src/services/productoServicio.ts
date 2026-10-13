import axios from "axios";
import type { Producto, ProductoFormulario } from "../types/Producto";

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

export const crearProducto = async (
  producto: ProductoFormulario,
): Promise<Producto> => {
  try {
    const respuesta = await axios.post(BASE_URL, producto);
    return respuesta.data;
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw error;
  }
};

export const actualizarProducto = async (
  id: string,
  producto: ProductoFormulario,
): Promise<Producto> => {
  try {
    const respuesta = await axios.put(`${BASE_URL}/${id}`, producto);
    return respuesta.data;
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    throw error;
  }
};

export const eliminarProducto = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
};
