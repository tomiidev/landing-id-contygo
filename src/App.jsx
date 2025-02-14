import { useEffect, useState } from 'react'

import './App.css'
import { API_LOCAL } from './apis';
import LocationAndModality from './location';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTiktok, faTwitter } from '@fortawesome/free-brands-svg-icons';
import FormReservation from './form';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import RegisterPayment from './register_payment';

function App() {
    const [formData, setFormData] = useState({
        idTherapist: "67a78dc1a0d27dd1623ec869",
        email: "",
        phone: "",
        age:"",
        gender:"Masculino",
        message: "",
    });

    const [responseMessage, setResponseMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getDataInformation = async () => {
            try {
                const response = await fetch(`${API_LOCAL}/get-id`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: "67a78dc1a0d27dd1623ec869" }), // ID en el cuerpo
                    mode: "cors", // Para manejar CORS
                    credentials: "include", // Para incluir cookies si es necesario
                });

                // Procesar la respuesta y convertirla a JSON
                const data = await response.json();

                // Verificar si la respuesta tiene un status 200 y contiene los datos
                if (response.ok) {
                    const userData = data.data;
                    console.log(userData); // Verifica si los datos son correctos
                    setUser(userData); // Establecer los datos en el estado
                } else {
                    setUser(null); // Si no hay datos, establece el estado como null
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                setUser(null); // En caso de error, también establece el estado como null
            }
        };

        getDataInformation();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const validateFormData = () => {
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            setResponseMessage("Por favor ingresa un correo electrónico válido.");
            return false;
        }
        if (!formData.phone || formData.phone.length < 8) {
            setResponseMessage("Por favor ingresa un número de teléfono válido.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFormData()) return;
        console.log(formData)

        setResponseMessage(""); // Limpiar mensaje previo
        try {
            const response = await fetch(`${API_LOCAL}/request-contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ formData: formData }),
                mode: "cors", // Para manejar CORS
                credentials: "include", // Para incluir cookies si es necesario
            });
            if (response.ok) {
                setResponseMessage("¡Mensaje enviado con éxito!");
            } else {
                setResponseMessage("Hubo un error al enviar el mensaje.");
            }
        } catch (error) {
            setResponseMessage("Error al intentar contactar. Inténtalo de nuevo.", error);
        }
    };

    return (
        <>
        <RegisterPayment/>
            {/* Cuerpo con desenfoque cuando el modal está abierto */}
            <div className={`px-5 sm:px-0 flex items-center justify-center min-h-screen ${isModalOpen ? "backdrop-blur-lg" : "bg-white"} transition-all duration-300 ease-in-out`}>
                <div className="flex flex-col items-center max-w-2xl w-full rounded-xl mt-5">
                    {/* Foto de perfil */}
                    <img
                        src={`https://contygo.s3.us-east-2.amazonaws.com/${user && user._id}/foto/${user && user.photo}`}
                        alt="Foto del Psicólogo"
                        className="w-48 h-48 rounded-full border-4 border-blue-500 shadow-xl mb-6"
                    />

                    {/* Nombre y Especialidad */}
                    <h2 className="text-lg font-bold text-black text-center mb-2">{user && user.name}</h2>
                    <p className="text-gray-800 text-md mb-4">{user && user.especiality}</p>

                    {/* Descripción */}
                    <p className="text-center text-sm text-gray-800 mb-6 px-4">
                        {user && user.description}
                    </p>
                    <LocationAndModality user={user} />

                    {/* Separador */}
                    <div className="w-20 h-1 bg-blue-500 my-8 rounded-full"></div>
                    {/*      <div className=' mb-5'>
                        <h4 className='text-center text-black mb-3 text-md'>Idiomas</h4>
                        <div className='flex items-center gap-2'>
                            <div className='p-2 text-black border px-3 py-1 text-sm rounded-full border-2 border-blue-500 gap-2'>
                                <span>Español</span>
                            </div>
                            <div className='text-black p-2 border px-3 py-1 text-sm rounded-full border-2 border-blue-500 gap-2'>
                                <span>Inglés</span>
                            </div>
                        </div>
                    </div> */}

                    <div className=' mb-5'>
                        <h4 className='text-center text-black mb-3 text-md'>Tipos de terapia</h4>
                        <div className='flex items-center gap-2'>
                            <div className='p-2 text-black border px-3 py-1 text-sm rounded-full border-2 border-blue-500 gap-2'>
                                <span>TCC</span>
                            </div>
                            <div className='text-black text-sm p-2 border px-3 py-1 rounded-full border-2 border-blue-500 gap-2'>
                                <span>Pscioanálisis</span>
                            </div>
                        </div>
                    </div>

                    <div className=''>
                        <h4 className='text-center text-black mb-3 text-md'>Rango de precio</h4>
                        <div className='flex items-center gap-2'>
                            <div className='p-2 text-black border px-3 py-1 text-sm rounded-full border-2 border-blue-500 gap-2'>
                                <span>1000 - 2000 UYU</span>
                            </div>
                        </div>
                    </div>

                    <div className='my-5'>
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-3 px-6 rounded-md shadow-md"
                        >
                            ¡Quiero agendar una consulta!
                        </button>
                    </div>

                    {/* Redes sociales */}
                    <div className="flex items-center gap-8 mt-4">
                        <a href="#" className="text-white hover:text-blue-700 text-4xl transition duration-200">
                            <FontAwesomeIcon icon={faFacebook} width={20} />
                        </a>
                        <a href="#" className="text-white hover:text-blue-700 text-4xl transition duration-200">
                            <FontAwesomeIcon icon={faTwitter} width={20} />
                        </a>
                        <a href="#" className="text-white hover:text-blue-700 text-4xl transition duration-200">
                            <FontAwesomeIcon icon={faInstagram} width={20} />
                        </a>
                        <a href="#" className="text-white hover:text-blue-700 text-4xl transition duration-200">
                            <FontAwesomeIcon icon={faTiktok} width={20} />
                        </a>
                        <a href="#" className="text-white hover:text-blue-700 text-4xl transition duration-200">
                            <FontAwesomeIcon icon={faLinkedin} width={20} />
                        </a>
                    </div>

                  
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md transition-all duration-300 ease-in-out">
                    <div className="bg-white p-8 rounded-md shadow-xl w-full max-w-lg relative">
                        {/* Botón de cierre dentro del modal */}
                        <button
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <span className="font-semibold"><FontAwesomeIcon icon={faClose} /></span>
                        </button>
                        <FormReservation
                            formData={formData}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                        />
                      {/* Mensaje de respuesta */}
                      {responseMessage && (
                        <p className={`mt-4 text-center text-sm ${responseMessage.includes("éxito") ? "text-black" : "text-red-500"}`}>
                            {responseMessage}
                        </p>
                    )}
                    </div>
                </div>
            )}



        </>

    );
}

export default App
