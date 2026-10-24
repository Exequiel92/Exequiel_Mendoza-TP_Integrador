import axios from "axios";
import type { Producto, ProductoFormulario } from "../types/Producto";

const BASE_URL = "http://localhost:4000/productos";

// Obtener todos los productos
export const obtenerProductos = async (): Promise<Producto[]> => {
  try {
    const respuesta = await axios.get(BASE_URL);
    return respuesta.data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
};

// Crear un producto
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

// Actualizar un producto
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

// Eliminar un producto
export const eliminarProducto = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
};

// Buscar productos por categoría
export const obtenerProductosPorCategoria = async (
  categoria: string,
): Promise<Producto[]> => {
  try {
    const respuesta = await axios.get(
      `${BASE_URL}/categoria/${encodeURIComponent(categoria)}`,
    );

    return respuesta.data;
  } catch (error) {
    // El backend responde 404 cuando no hay productos en esa categoría.
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return [];
    }

    console.error("Error al buscar productos por categoría:", error);
    throw error;
  }
};

// Buscar productos con una cantidad inferior al límite indicado
export const obtenerProductosBajoStock = async (
  cantidad: number,
): Promise<Producto[]> => {
  try {
    const respuesta = await axios.get(`${BASE_URL}/bajo-stock/${cantidad}`);

    return respuesta.data;
  } catch (error) {
    // El backend responde 404 cuando no hay productos con bajo stock.
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return [];
    }

    console.error("Error al consultar productos con bajo stock:", error);
    throw error;
  }
};

// Estructura que espera el backend para actualizar el stock
export type ActualizacionStock = {
  id: string;
  cantidad: number;
};

// Actualizar el stock de varios productos en una sola petición
export const actualizarStock = async (
  productos: ActualizacionStock[],
): Promise<void> => {
  try {
    await axios.put(`${BASE_URL}/actualizar-stock`, productos);
  } catch (error) {
    console.error("Error al actualizar el stock:", error);
    throw error;
  }
};
