# Tienda — Trabajo Práctico Integrador

Aplicación web para la gestión de un catálogo de productos. Permite consultar productos, filtrar por categoría y nivel de stock, registrar nuevos productos, editar sus datos, actualizar cantidades y eliminar productos.

## Tecnologías utilizadas

**Frontend**

- React y TypeScript.
- Vite.
- React Bootstrap y Bootstrap Icons.
- React Router para la navegación.
- Axios para las peticiones HTTP.
- Formik y Yup para formularios y validaciones.

**Backend**

- Node.js y Express.
- MongoDB Atlas como base de datos.
- Mongoose para la interacción con MongoDB.
- Express Validator para validar los datos recibidos.
- CORS para gestionar las solicitudes entre el frontend y el backend.

## API REST

El frontend consume una API REST propia desarrollada con Node.js y Express. Las peticiones HTTP se realizan mediante Axios.

La API permite consultar, crear, modificar y eliminar productos, así como filtrar el catálogo y actualizar el stock.

### Endpoints principales

| Método | Endpoint                          | Descripción                                                       |
| ------ | --------------------------------- | ----------------------------------------------------------------- |
| GET    | `/productos`                      | Obtiene todos los productos.                                      |
| GET    | `/productos/:id`                  | Obtiene un producto por su identificador.                         |
| GET    | `/productos/categoria/:categoria` | Filtra los productos por categoría.                               |
| GET    | `/productos/bajo-stock/:cantidad` | Consulta los productos con stock inferior a la cantidad indicada. |
| POST   | `/productos`                      | Registra un nuevo producto.                                       |
| PUT    | `/productos/:id`                  | Modifica un producto existente.                                   |
| DELETE | `/productos/:id`                  | Elimina un producto.                                              |
| PUT    | `/productos/actualizar-stock`     | Actualiza el stock de varios productos.                           |

En la actualización masiva del stock, el cuerpo de la petición debe contener un arreglo de objetos con el identificador del producto y la cantidad correspondiente.

## Requisitos previos

Para ejecutar el proyecto localmente, necesitas:

- Node.js y npm instalados.
- Git.
- Una cuenta y una base de datos configurada en MongoDB Atlas.

## Cómo ejecutar el proyecto en local

El frontend y el backend se ejecutan en terminales separadas.

### 1. Clonar el repositorio

```bash
git clone https://github.com/Exequiel92/Exequiel_Mendoza-TP_Integrador.git
cd Exequiel_Mendoza-TP_Integrador
```

### 2. Configurar y ejecutar el backend

Ingresar en la carpeta del backend e instalar las dependencias:

```bash
cd backend
npm install
```

Crear un archivo llamado `.env` dentro de la carpeta `backend` y configurar la variable de conexión a MongoDB Atlas:

```env
MONGO_URI=tu_cadena_de_conexion_de_mongodb_atlas
```

Reemplazar el valor de ejemplo por la cadena de conexión correspondiente a la base de datos.

Iniciar el servidor:

```bash
npm run dev
```

Por defecto, el backend se ejecuta en:

`http://localhost:4000`

### 3. Configurar y ejecutar el frontend

Abrir una segunda terminal desde la raíz del repositorio e ingresar en la carpeta del frontend:

```bash
cd frontend
npm install
npm run dev
```

Vite mostrará en la terminal la dirección local de la aplicación, normalmente:

`http://localhost:5173`

El frontend utiliza `http://localhost:4000` como dirección predeterminada de la API en el entorno local. Si se necesita otra dirección, puede configurarse mediante la variable de entorno `VITE_API_URL`.

## Aplicación publicada

El proyecto también cuenta con implementaciones en Vercel:

- **Frontend:** https://exequiel-tienda-frontend.vercel.app/
- **Backend:** https://exequiel-tienda-backend.vercel.app/

La disponibilidad de la API depende de que el backend pueda conectarse correctamente con MongoDB Atlas.

## Autor

**Exequiel José Mendoza**

Trabajo Práctico Integrador.
