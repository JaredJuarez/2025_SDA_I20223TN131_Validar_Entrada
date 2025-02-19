import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FormularioRegistro from "./FormularioRegistro";
import EmpresasListado from "./EmpresasListado";
import EmpresaDetalle from "./EmpresasDetalles";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="p-4 bg-gray-800 text-white flex justify-center space-x-4">
          <Link to="/" className="hover:underline">Inicio</Link>
          <Link to="/empresas" className="hover:underline">Ver Empresas</Link>
        </nav>
        <Routes>
          <Route path="/" element={<FormularioRegistro />} />
          <Route path="/2025_SDA_I20223TN131_Validar_Entrada" element={<FormularioRegistro />} />
          <Route path="/empresas" element={<EmpresasListado />} />
          <Route path="/empresa/:id" element={<EmpresaDetalle />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
