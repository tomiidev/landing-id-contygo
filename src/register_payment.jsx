import { useEffect } from "react";
import { API_URL } from "./apis";

const RegisterPayment = () => {
    useEffect(() => {
        // Capturar los parámetros de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const paymentData = {
            collection_id: urlParams.get('collection_id'),
            collection_status: urlParams.get('collection_status'),
            payment_id: urlParams.get('payment_id'),
            status: urlParams.get('status'),
            external_reference: urlParams.get('external_reference'),
            payment_type: urlParams.get('payment_type'),
            merchant_order_id: urlParams.get('merchant_order_id'),
            preference_id: urlParams.get('preference_id'),
            site_id: urlParams.get('site_id'),
            processing_mode: urlParams.get('processing_mode'),
            merchant_account_id: urlParams.get('merchant_account_id'),
        };

        // Validar que haya al menos un parámetro antes de enviar
        if (paymentData.payment_id) {
            console.log("Enviando datos al backend:", paymentData);

            // Enviar los datos al backend
            fetch(`${API_URL}/register-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            })
                .then((response) => {
                    if (response.ok) {
                        console.log('Pago registrado exitosamente');
                    } else {
                        console.error('Error al registrar el pago');
                    }
                })
                .catch((error) => {
                    console.error('Error en la solicitud:', error);
                });
        }
    }, []); // Ejecutar solo una vez al montar el componente

    return null; // No renderiza nada, solo envía los datos
};

export default RegisterPayment;
