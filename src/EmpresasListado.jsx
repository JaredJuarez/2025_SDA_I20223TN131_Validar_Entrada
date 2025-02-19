import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const EmpresasListado = () => {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerEmpresas = async () => {
      try {
        const response = await axios.get("http://localhost:8080/empresas");
        setEmpresas(response.data);
      } catch (error) {
        console.error("Error al obtener empresas", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerEmpresas();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-2xl mt-16">
      <h2 className="text-2xl font-bold mb-4 text-center">Empresas Registradas</h2>
      {loading ? <p>Cargando...</p> : (
        <ul className="space-y-2">
          {empresas.map((empresa) => (
            <li key={empresa.id} className="p-2 border rounded-lg flex justify-between">
              <span>{empresa.razonSocial} - {empresa.rfc}</span>
              <Link to={`/empresa/${empresa.uuid}`} className="text-blue-500 hover:underline">Ver detalles</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmpresasListado;
