import React, { useState } from 'react';
import { Flex, View, Text, Button, TextField } from "@aws-amplify/ui-react";
import emailjs from 'emailjs-com';

export function EmailModal({ title, content, isOpen, onClose, isContactForm }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.send(
            'YOUR_SERVICE_ID',
            'YOUR_TEMPLATE_ID',
            formData,
            'YOUR_USER_ID'
        ).then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            alert('Mensaje enviado!');
            onClose();
        }).catch((err) => {
            console.log('FAILED...', err);
            alert('Error al enviar el mensaje, por favor intenta nuevamente.');
        });
    };

    if (!isOpen) return null;

    return (
        <View
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                padding: '2rem',
                boxShadow: '0 0 16px rgba(0, 0, 0, 0.2)',
                zIndex: 1000,
                borderRadius: '8px',
                width: '80%',
                maxWidth: '500px',
            }}
        >
            <Text fontSize="1.5rem" fontWeight="bold" marginBottom="1rem">
                {title}
            </Text>
            {isContactForm ? (
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="name"
                        placeholder="Nombre"
                        label="Nombre"
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        name="email"
                        type="email"
                        placeholder="Correo electrónico"
                        label="Correo electrónico"
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        name="message"
                        placeholder="Mensaje"
                        label="Mensaje"
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit">Enviar</Button>
                </form>
            ) : (
                <Text marginBottom="2rem">
                    {content}
                </Text>
            )}
            <Button onClick={onClose}>Cerrar</Button>
        </View>
    );
}
