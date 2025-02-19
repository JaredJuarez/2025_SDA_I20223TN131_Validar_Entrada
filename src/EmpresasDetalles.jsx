import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EmpresaDetalle = () => {
  const { id } = useParams();
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerEmpresa = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/empresas/${id}`);
        setEmpresa(response.data);
      } catch (error) {
        console.error("Error al obtener empresa", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerEmpresa();
  }, [id]);

  if (loading) return <p className="text-center mt-4">Cargando...</p>;
  if (!empresa) return <p className="text-center mt-4 text-red-500">Empresa no encontrada</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-2xl mt-16">
      <h2 className="text-2xl font-bold mb-4 text-center">{empresa.razonSocial}</h2>
      <p><strong>RFC:</strong> {empresa.rfc}</p>
      <p><strong>Teléfono:</strong> {empresa.codigoPais} {empresa.telefono}</p>
      <p><strong>Contacto:</strong> {empresa.contacto}</p>
      <p><strong>Correo:</strong> {empresa.correo}</p>
    </div>
  );
};

export default EmpresaDetalle;
