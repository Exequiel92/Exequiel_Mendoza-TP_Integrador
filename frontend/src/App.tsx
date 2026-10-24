import BarraNavegacion from "./components/BarraNavegacion/BarraNavegacion";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import PaginaInicio from "./pages/PaginaInicio";
import PaginaProductos from "./pages/PaginaProductos";
import ManualUsuario from "./pages/ManualUsuario/ManualUsuario";

function App() {
  return (
    <>
      <BarraNavegacion />
      <Routes>
        <Route path="/" element={<PaginaInicio />} />
        <Route path="/productos" element={<PaginaProductos />} />
        <Route path="/manual-usuario" element={<ManualUsuario />} />
      </Routes>
    </>
  );
}

export default App;
