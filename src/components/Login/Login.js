import React from 'react';
import {
    Authenticator,
    Flex,
    Grid,
    Card,
    Image,
    ThemeProvider,
    createTheme,
    useTheme,
    View,
    Text,
    Link,
    Menu,
    MenuItem,
    MenuButton
} from "@aws-amplify/ui-react";

import { Header } from "./Header";
import { Footer } from "./Footer";
import {Footer  as Footerweb} from "../Footer/Footer";
import { SignInHeader } from "./SignInHeader";
import { SignInFooter } from "./SignInFooter";
import splash from "../../assets/imagenLogin.png";
import splashMision from "../../assets/imagenLogin_mision.png";
import logo from "../../assets/logoPSA_2.png";
import TextCarousel from "./TextCarousel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the necessary CSS styles
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLightbulb, faBook, faMicrochip, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import BackgroundVideo from './BackgroundVideo';
import './Login.css';

const components = {
    Header,
    SignIn: {
        Header: SignInHeader,
        Footer: SignInFooter
    },
    Footer
};

/*const messages = [
    "Master the art of poker with strategic thinking.",
    "Unlock your poker potential with effective study habits.",
    "Analyze your hands, improve your game.",
    "Efficiency in study translates to success at the table.",
    "Practice makes perfect: study consistently, play brilliantly.",
    "From novice to pro: your journey starts with smart study.",
    "Consistency is key: study daily, win frequently.",
    "Smart study, smart play: the path to poker mastery.",
    "Turn your weaknesses into strengths with thorough study.",
    "Be the player everyone fears: study smarter, win bigger."
];*/
const messages = [
    "Sé el jugador que todos temen: estudia de manera más inteligente, gana más grande.",
    "Domina el arte del poker con pensamiento estratégico.",
    "Desbloquea tu potencial en el poker con hábitos de estudio efectivos.",
    "Analiza tus manos, mejora tu juego.",
    "La eficiencia en el estudio se traduce en éxito en la mesa.",
    "La práctica hace al maestro: estudia consistentemente, juega brillantemente.",
    "De principiante a profesional: tu viaje comienza con un estudio inteligente.",
    "La consistencia es clave: estudia a diario, gana frecuentemente.",
    "Estudio inteligente, juego inteligente: el camino hacia la maestría en el poker.",
    "Convierte tus debilidades en fortalezas con un estudio minucioso.",

];


export function Login() {
    const { tokens } = useTheme();

    const myTheme = createTheme({
        name: 'my-theme',
        tokens: {
            colors: {
                background: {
                    primary: { value: '#192831' },
                },
                font: {
                    primary: { value: '#fff' },
                    secondary: { value: '#fff' }
                },
                brand: {
                    primary: {
                        10: '#ff0000', // Color más claro
                        80: '#b30000', // Color más oscuro
                        100: '#990000', // Color principal
                    },
                },
            },
            components: {
                authenticator: {
                    router: {
                        boxShadow: `0 0 16px ${tokens.colors.overlay['10']}`,
                        borderWidth: '0',
                    },
                    form: {
                        padding: `${tokens.space.medium} ${tokens.space.xl} ${tokens.space.medium}`,
                    },
                },
                button: {
                    primary: {
                        backgroundColor: { value: '#fff' }, // Color de fondo del botón primario
                        color: { value: '#000' }, // Color del texto del botón primario
                        _hover: {
                            backgroundColor: { value: '#e0e0e0' }, // Color de fondo al pasar el cursor sobre el botón
                        },
                        _focus: {
                            backgroundColor: { value: '#c0c0c0' }, // Color de fondo cuando el botón está enfocado
                        },
                        _active: {
                            backgroundColor: { value: '#a0a0a0' }, // Color de fondo cuando el botón está activo
                        },
                    },
                },
            },
        },
    });

    return (
        <ThemeProvider theme={myTheme}>
        <Grid
            columnGap="0rem"
            rowGap="0rem"
            templateColumns="1fr 1fr 1fr"
            templateRows="0fr 0fr 0fr"
            height="100%"
        >
            <Card
                padding="0px"
                columnStart="1"
                columnEnd="-1"
                top="0" width="100%"
            >

                <Flex justifyContent="space-between" alignItems="center" padding="1rem" backgroundColor={tokens.colors.font.primary.value}>
                    <Image src={logo} alt="Logo" width="80px" height="80px" />

                    <Flex gap="1rem">
                        <Link href="#nav1" color="white">
                            <FontAwesomeIcon icon="question" /> Qué es PSA
                        </Link>
                        <Link href="#nav2" color="white">
                            <FontAwesomeIcon icon="star" /> Características
                        </Link>
                        <Link href="#nav3" color="white">
                            <FontAwesomeIcon icon="tag" /> Precios
                        </Link>
                        <Link href="#nav4" color="white">
                            <FontAwesomeIcon icon="right-to-bracket" /> Ingresar
                        </Link>
                    </Flex>
                </Flex>

            </Card>
            <Card
                padding="0px"
                columnStart="1"
                columnEnd="-1"
                height="100%"
            >
                <div id="nav0" style={{ height: '100%', color: '#333', backgroundColor: '#fff'}}>
                    <div className="container-portada">
                        <div className="capa-gradient"></div>
                        <div className="container-details">
                            <div className="details">
                                <Text fontSize="3rem" color="white" fontWeight="bold">Poker Study App</Text>
                                <Text fontSize="1.25rem">
                                    Es una plataforma simple pero poderosa
                                    que facilita el aprendizaje y la mejora continua en el juego de poker. Creemos en la importancia de la educación
                                    y la práctica inteligente para alcanzar la maestría en el poker.

                                </Text>
                            </div>
                        </div>

                    </div>
                </div>
            </Card>
            <Card
                padding="0px"
                columnStart="1"
                columnEnd="-1"
                height="100%"
            >
                <div id="nav2" style={{ height: '100%', color: 'black', backgroundColor: 'white', padding: '2rem' }}>
                    <Grid templateColumns="repeat(4, 1fr)" gap="2rem">
                        <Flex direction="column" alignItems="center">
                            <Flex
                                justifyContent="center"
                                alignItems="center"
                                width="100px"
                                height="100px"
                                borderRadius="50%"
                                border="2px solid #192831"
                                color="#192831"
                            >
                                <FontAwesomeIcon icon={faLightbulb} size="3x" />
                            </Flex>
                            <Text fontSize="1.5rem" fontWeight="bold" marginTop="1rem" color="#192831">Simpleza</Text>
                            <Text fontSize="1rem" fontWeight="normal" marginTop="1rem" color="#192831" textAlign="center">Contamos con una interfaz intuitiva y fácil de manejar, con los elementos más importantes para un estudio eficiente y efectivo.</Text>
                        </Flex>
                        <Flex direction="column" alignItems="center">
                            <Flex
                                justifyContent="center"
                                alignItems="center"
                                width="100px"
                                height="100px"
                                borderRadius="50%"
                                border="2px solid #192831"
                                color="#192831"
                            >
                                <FontAwesomeIcon icon={faBook} size="3x" />
                            </Flex>
                            <Text fontSize="1.5rem" fontWeight="bold" marginTop="1rem" color="#192831">Aprendizaje</Text>
                            <Text fontSize="1rem" fontWeight="normal" marginTop="1rem" color="#192831" textAlign="center">Entregamos un espacio estructurado y ordenado para registrar todos los consejos y aprendizajes que un jugador necesita incorporar en su juego.</Text>
                        </Flex>
                        <Flex direction="column" alignItems="center">
                            <Flex
                                justifyContent="center"
                                alignItems="center"
                                width="100px"
                                height="100px"
                                borderRadius="50%"
                                border="2px solid #192831"
                                color="#192831"
                            >
                                <FontAwesomeIcon icon={faGraduationCap} size="3x" />
                            </Flex>
                            <Text fontSize="1.5rem" fontWeight="bold" marginTop="1rem" color="#192831">Entrenamiento</Text>
                            <Text fontSize="1rem" fontWeight="normal" marginTop="1rem" color="#192831" textAlign="center">Pon a prueba tu aprendizaje repasando tus manos en nuestro trainer. Además, sube el nivel de tu poker entrenando con soluciones preparadas por coaches profesionales.</Text>
                        </Flex>
                        <Flex direction="column" alignItems="center">
                            <Flex
                                justifyContent="center"
                                alignItems="center"
                                width="100px"
                                height="100px"
                                borderRadius="50%"
                                border="2px solid #192831"
                                color="#192831"
                            >
                                <FontAwesomeIcon icon={faMicrochip} size="3x" />
                            </Flex>
                            <Text fontSize="1.5rem" fontWeight="bold" marginTop="1rem" color="#192831">Tecnología</Text>
                            <Text fontSize="1rem" fontWeight="normal" marginTop="1rem" color="#192831" textAlign="center">Nos apalacamos en la tecnología para optimizar el tiempo y esfuerzo de los jugadores a la hora de analizar manos y sesiones de coaching.</Text>
                        </Flex>
                    </Grid>
                </div>
            </Card>
            <Card
                padding="0px"
                columnStart="1"
                columnEnd="-1"
                height="100%"
            >
                <div id="nav1" style={{ height: '100%', color: '#333', backgroundColor: '#084450', padding: '2rem' }}>
                    <Grid templateColumns="1fr 1fr" gap="2rem">
                        <Image
                            src={splashMision}
                            width="100%"
                            height="200px"

                            borderRadius="10px"
                        />
                        <div>



                            <Text fontSize="1.25rem">
                                Nos esforzamos por ser la herramienta preferida por jugadores de poker de todos los niveles para anotar,
                                revisar y analizar sus manos. Con una interfaz intuitiva y funciones eficientes, ayudamos a los jugadores
                                a maximizar su potencial a través del estudio constante y la retroalimentación constructiva durante las sesiones
                                de coaching o el análisis de videos de otros jugadores.
                            </Text>
                        </div>
                    </Grid>
                </div>
            </Card>

            <Card
                padding="0px"
                columnStart="1"
                columnEnd="-1"
                height="100%"
            >
                <div id="nav3" style={{ height: '100%', color: 'black', backgroundColor: 'white', padding: '2rem' }}>
                    <Grid templateColumns="repeat(3, 1fr)" gap="2rem">
                        {[
                            { plan: "Plan Básico", price: "GRATIS", description: "Acceso al módulo de bitácora de manos." },
                            { plan: "Plan Pro", price: "5 USD / mes", description: "Acceso al módulo de bitácora de manos, y al trainer de manos propias. " },
                            { plan: "Plan Premium", price: "49 USD / mes", description: "Acceso al módulo de bitácora de manos, al trainer de manos propias y a manos solucionadas por nuestros coaches." },
                        ].map((item, index) => (
                            <Flex key={index} direction="column" alignItems="center" padding="2rem" border="1px solid #00ECB3" borderRadius="10px" backgroundColor="#f9f9f9">
                                <Text fontSize="1.5rem" fontWeight="bold" color= 'black'>{item.plan}</Text>
                                <Text fontSize="1.25rem" fontWeight="bold" color="#039370" marginTop="0.5rem">{item.price}</Text>
                                <Text fontSize="1rem" textAlign="center" marginTop="0.5rem"color= 'black'>{item.description}</Text>
                            </Flex>
                        ))}
                    </Grid>
                </div>
            </Card>
            <Card
                padding="0px"
                columnStart="1"
                columnEnd="-1"
                paddingTop="5rem"
            >
                <div id="nav4">
                <Grid templateColumns={{ base: "1fr", medium: "1fr 1fr" }} >
                <Flex
                    backgroundColor="#000F18"
                    justifyContent="center"
                    alignItems="center"
                    height="100vh"
                >

                        <Authenticator components={components}>
                            {({ signOut, user }) => (
                                <main>
                                    <h1>Hello {user.username}</h1>
                                    <button onClick={signOut}>Salir</button>
                                </main>
                            )}
                        </Authenticator>

                </Flex>
                <View height="100vh" position="relative" display={{ base: 'none', medium: 'block' }}>
                    <div  style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        color: 'white',
                        fontSize: '4rem',
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                        padding: '20px',
                        textAlign: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)' // Background semi-transparent to improve text readability

                    }}>
                        <TextCarousel messages={messages} /></div>
                    <Image
                        src={splash}
                        width="100%"
                        height="100%"
                        objectFit="cover"
                    />


                </View>
                </Grid>
                </div>
            </Card>
            <Card
                padding="0px"
                columnStart="1"
                columnEnd="-1"
                height="100px"
            >
                <Footerweb />
            </Card>
        </Grid>

</ThemeProvider>

    );
}
