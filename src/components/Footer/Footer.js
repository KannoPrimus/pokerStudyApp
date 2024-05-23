import React, { useState } from 'react';
import { Flex, Link, Icon, Text } from "@aws-amplify/ui-react";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Modal } from './Modal';

const privacyPolicyContent = `
# Política de Privacidad
## 1. Introducción
Bienvenido a Poker Study App. Valoramos su privacidad y nos comprometemos a proteger sus datos personales. Esta política de privacidad le informará sobre cómo cuidamos sus datos personales cuando visita nuestro sitio web y le informará sobre sus derechos de privacidad y cómo la ley lo protege.
## 2. Información que Recopilamos
### Información Personal
Podemos recopilar, usar, almacenar y transferir diferentes tipos de datos personales sobre usted que hemos agrupado de la siguiente manera:
- **Identificación y datos de contacto**: Incluye nombre, dirección de correo electrónico, número de teléfono.
- **Datos de uso**: Incluye información sobre cómo usa nuestro sitio web, productos y servicios.
- **Datos técnicos**: Incluye dirección IP, tipo de navegador, versiones del navegador, configuración de zona horaria, tipos y versiones de complementos del navegador, sistema operativo y plataforma.
### Datos No Personales
También recopilamos, usamos y compartimos datos agregados, como datos estadísticos o demográficos. Los datos agregados pueden derivarse de sus datos personales, pero no se consideran datos personales en la ley, ya que no revelan su identidad directa o indirectamente.
## 3. Cómo Recopilamos Sus Datos Personales
Usamos diferentes métodos para recopilar datos de y sobre usted, incluyendo:
- **Interacciones directas**: Puede proporcionarnos sus datos personales completando formularios o comunicándose con nosotros por correo postal, teléfono, correo electrónico o de otro modo.
- **Tecnologías automatizadas**: A medida que interactúa con nuestro sitio web, podemos recopilar automáticamente datos técnicos sobre su equipo, acciones de navegación y patrones. Recopilamos estos datos personales mediante cookies y otras tecnologías similares.
## 4. Cómo Usamos Sus Datos Personales
Usamos los datos que recopilamos para varios propósitos, incluyendo:
- **Para proporcionar y mantener nuestro Servicio**.
- **Para notificarle sobre cambios en nuestro Servicio**.
- **Para permitirle participar en funciones interactivas de nuestro Servicio cuando elija hacerlo**.
- **Para proporcionar atención y soporte al cliente**.
- **Para proporcionar análisis o información valiosa para que podamos mejorar el Servicio**.
- **Para monitorear el uso del Servicio**.
- **Para detectar, prevenir y abordar problemas técnicos**.
## 5. Divulgación de Sus Datos Personales
Podemos compartir sus datos personales con las siguientes partes:
- **Proveedores de servicios**: Empresas que proporcionan servicios en nuestro nombre.
- **Afiliados**: Podemos compartir su información con nuestros afiliados, en cuyo caso les exigiremos que respeten esta política de privacidad.
- **Cumplimiento de las leyes**: Podemos divulgar su información cuando lo requiera la ley o en respuesta a solicitudes válidas por parte de las autoridades públicas.
## 6. Seguridad de Sus Datos Personales
Nos comprometemos a proteger sus datos personales y hemos implementado medidas de seguridad adecuadas para evitar que sus datos personales se pierdan accidentalmente, se usen o accedan de manera no autorizada, se alteren o se divulguen. Además, limitamos el acceso a sus datos personales a aquellos empleados, agentes, contratistas y otros terceros que tienen una necesidad comercial de conocer dicha información.

## 7. Retención de Datos

Solo conservaremos sus datos personales durante el tiempo que sea necesario para cumplir con los propósitos para los cuales los recopilamos, incluidos los fines de satisfacer cualquier requisito legal, contable o de informes.

## 8. Sus Derechos Legales

Bajo ciertas circunstancias, tiene derechos bajo las leyes de protección de datos en relación con sus datos personales, incluyendo el derecho a:
- Solicitar acceso a sus datos personales.
- Solicitar corrección de sus datos personales.
- Solicitar eliminación de sus datos personales.
- Oponerse al procesamiento de sus datos personales.
- Solicitar la restricción del procesamiento de sus datos personales.
- Solicitar la transferencia de sus datos personales.
- Derecho a retirar el consentimiento.

Si desea ejercer alguno de los derechos mencionados anteriormente, contáctenos.

## 9. Cambios a Esta Política de Privacidad

Podemos actualizar nuestra política de privacidad de vez en cuando. Le notificaremos cualquier cambio publicando la nueva política de privacidad en esta página. Se recomienda revisar esta política de privacidad periódicamente para cualquier cambio.

## 10. Contacto

Si tiene alguna pregunta sobre esta política de privacidad o nuestras prácticas de privacidad, por favor contáctenos en:

**Poker Study App**
Email: info@pokerstudyapp.com
`;



export function Footer() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', content: '', isContactForm: false });

    const openModal = (title, content, isContactForm = false) => {
        setModalContent({ title, content, isContactForm });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Flex
            as="footer"
            direction="column"
            alignItems="center"
            padding="1rem"
            backgroundColor="#192831"
            color="white"
            textAlign="center"
        >
            <Flex direction="row" gap="1rem" marginBottom="1rem">
                <Link
                    as="button"
                    onClick={() => openModal('Política de Privacidad', privacyPolicyContent)}
                    color="white"
                >
                    Política de Privacidad
                </Link>
                <Link
                    as="button"
                    onClick={() => openModal('Términos de Servicio', 'Aquí va el contenido de los términos de servicio.')}
                    color="white"
                >
                    Términos de Servicio
                </Link>
                <Link
                    as="button"
                    onClick={() => openModal('Contáctanos', '', true)}
                    color="white"
                >
                    Contáctanos
                </Link>
            </Flex>

            <Text fontSize="0.75rem">
                &copy; {new Date().getFullYear()} Poker Study App. Todos los derechos reservados.
            </Text>

            <Modal
                title={modalContent.title}
                content={modalContent.content}
                isOpen={isModalOpen}
                onClose={closeModal}
                isContactForm={modalContent.isContactForm}
            />
        </Flex>
    );
}
