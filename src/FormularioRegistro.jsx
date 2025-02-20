import { useState } from "react";
import { allCountries } from "country-telephone-data";
import axios from "axios";

const FormularioRegistro = () => {
  const [formData, setFormData] = useState({
    razonSocial: "",
    rfc: "",
    telefono: "",
    contacto: "",
    correo: "",
    codigoPais: ""
  });
  
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!/^[a-zA-Z0-9\s.]+$/.test(formData.razonSocial)) {
      newErrors.razonSocial = "La razón social solo puede contener letras, números, espacios y puntos.";
    }
    if (!/^[A-ZÑ&]{3}[0-9]{6}[A-Z0-9]{3}$/.test(formData.rfc)) {
      newErrors.rfc = "El RFC debe tener 12 caracteres alfanuméricos válidos.";
    }
    if (!/^\d{10}$/.test(formData.telefono)) {
      newErrors.telefono = "El teléfono debe contener exactamente 10 dígitos.";
    }
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(formData.contacto)) {
      newErrors.contacto = "El nombre del contacto solo puede contener letras y espacios.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = "El correo electrónico no es válido.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await axios.post("http://localhost:8080/empresas", formData);
        alert("Empresa registrada correctamente");
        setFormData({
          razonSocial: "",
          rfc: "",
          telefono: "",
          contacto: "",
          correo: "",
          codigoPais: ""
        });
      } catch (error) {
        console.error("Error al registrar empresa", error);
        alert("Hubo un error al registrar la empresa");
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-2xl mt-16">
      <h2 className="text-2xl font-bold mb-4 w-full text-center">Registro de Empresa</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Razón Social</label>
          <input type="text" name="razonSocial" value={formData.razonSocial} onChange={handleChange} className={`w-full p-2 border rounded-lg ${errors.razonSocial ? "border-red-500" : "border-gray-300"}`} />
          {errors.razonSocial && <p className="text-red-500 text-sm">{errors.razonSocial}</p>}
        </div>
        <div>
          <label className="block font-medium">RFC</label>
          <input type="text" name="rfc" value={formData.rfc} onChange={handleChange} className={`w-full p-2 border rounded-lg ${errors.rfc ? "border-red-500" : "border-gray-300"}`} />
          {errors.rfc && <p className="text-red-500 text-sm">{errors.rfc}</p>}
        </div>
        <div>
          <label className="block font-medium">Teléfono</label>
          <div className="flex">
            <select name="codigoPais" value={formData.codigoPais} onChange={handleChange} className="border rounded-l-lg border-gray-300">
              <option value="">+...</option>
              {allCountries.map(({ dialCode }) => (
                <option key={dialCode} value={`+${dialCode}`}>(+{dialCode})</option>
              ))}
            </select>
            <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} className={`w-full p-2 border rounded-r-lg ${errors.telefono ? "border-red-500" : "border-gray-300"}`} />
          </div>
          {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono}</p>}
        </div>
        <div>
          <label className="block font-medium">Contacto</label>
          <input type="text" name="contacto" value={formData.contacto} onChange={handleChange} className={`w-full p-2 border rounded-lg ${errors.contacto ? "border-red-500" : "border-gray-300"}`} />
          {errors.contacto && <p className="text-red-500 text-sm">{errors.contacto}</p>}
        </div>
        <div>
          <label className="block font-medium">Correo Electrónico</label>
          <input type="email" name="correo" value={formData.correo} onChange={handleChange} className={`w-full p-2 border rounded-lg ${errors.correo ? "border-red-500" : "border-gray-300"}`} />
          {errors.correo && <p className="text-red-500 text-sm">{errors.correo}</p>}
        </div>
        <button type="submit" className="w-full p-2 bg-gray-800 text-white rounded-lg">Registrar</button>
      </form>
    </div>
  );
};

export default FormularioRegistro;
