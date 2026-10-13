export type Producto = {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  categoria: string;
  fechaIngreso: Date;
};

export type ProductoFormulario = Pick<
  Producto,
  "nombre" | "descripcion" | "precio" | "cantidad" | "categoria"
>;
