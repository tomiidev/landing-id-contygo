import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faVideo, faCircle } from "@fortawesome/free-solid-svg-icons";

const LocationAndModality = ({ user }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
  {/* Marcador de ubicación */}
  <div className="flex items-center gap-2">
    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-black" width={20} />
    <p className="text-black text-sm">Montevideo</p>
  </div>

  {/* Modalidad Presencial */}
  {user && (user.modality === "presencial" || user.modality === "ambas") && (
    <div className="flex items-center gap-2">
      <FontAwesomeIcon icon={faCircle} className="text-green-500" width={10} />
      <p className="text-black text-sm">Presencial</p>
    </div>
  )}

  {/* Modalidad Online */}
  {user && (user.modality === "online" || user.modality === "ambas") && (
    <div className="flex items-center border px-3 py-1 rounded-full border-3 border-blue-500 gap-2">
      <FontAwesomeIcon icon={faVideo} className="text-blue-500" width={20} />
      <p className="text-black text-sm">Ofrece sesiones online</p>
    </div>
  )}
</div>
    
  );
};

// 🔹 Validación de props con PropTypes (valores en minúsculas para coherencia)
LocationAndModality.propTypes = {
  user: PropTypes.shape({
    modality: PropTypes.oneOf(["online", "presencial", "ambas"]).isRequired,
  }).isRequired,
};

export default LocationAndModality;
