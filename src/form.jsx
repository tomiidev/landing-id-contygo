import PropTypes from "prop-types";
import { useState } from "react";

const FormReservation = ({ handleSubmit, handleChange, formData }) => {
  const [loading, setLoading] = useState(false); // Estado para controlar el botón

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Bloquea el botón mientras envía
    await handleSubmit(e);
    setLoading(false); // Desbloquea el botón después de enviar
  };

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-6 mt-10">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nombre"
        className="w-full p-4 bg-white border border-gray-600 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-4 bg-white border border-gray-600 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Teléfono"
        className="w-full p-4 bg-white border border-gray-600 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
      <input
        type="text"
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="Edad"
        className="w-full p-4 bg-white border border-gray-600 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
      <select   name="gender" onChange={handleChange} value={formData.gender} className="w-full p-4 bg-white border border-gray-600 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
        <option value="masculino">Masculino</option>
        <option value="femenino">Femenino</option>
      </select>
      <textarea
      maxLength={70}
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Mensaje"
        className="w-full p-4 bg-white border border-gray-600 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-36 resize-none transition duration-200"
      ></textarea>

      <button
        type="submit"
        className={`w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700  ${loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        disabled={loading}
      >
        {loading ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
};

// ✅ PropTypes corregidos
FormReservation.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    idTherapist: PropTypes.string.isRequired
  }).isRequired,
};

export default FormReservation;
