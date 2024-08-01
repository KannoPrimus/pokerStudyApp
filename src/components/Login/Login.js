import React, { useRef, useState } from 'react';
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
useAuthenticator
} from "@aws-amplify/ui-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Footer as Footerweb } from "../Footer/Footer";
import { SignInHeader } from "./SignInHeader";
import { SignInFooter } from "./SignInFooter";
import splash from "../../assets/imagenLogin.png";
import splashMision from "../../assets/Poker Crushers - Study mode.jpg";
import splashMision2 from "../../assets/Poker Crushers - Trainer mode.jpg";
import splashMision3 from "../../assets/Poker Crushers - Analytics mode.jpg";
import pokerplayer from "../../assets/pokerplayer_crusher.png";
import home1 from "../../assets/home_1.png";
import home2 from "../../assets/home_2.png";
import home3 from "../../assets/home_3.png";
import article1 from "../../assets/pokerplayer_study.png";
import logo from "../../assets/logoPSA_soloPica.png";
import TextCarousel from "./TextCarousel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the necessary CSS styles
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLightbulb, faBook, faMicrochip, faGraduationCap, faBars, faTimes,faCheck } from '@fortawesome/free-solid-svg-icons';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Login.css';

const components = {
    Header,
    SignIn: {
        Header: SignInHeader,
        Footer: SignInFooter
    },
    Footer
};

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
    const nav4Ref = useRef(null);
    const nav3Ref = useRef(null);
    const nav1_3Ref = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const scrollToNav4 = () => {
        nav4Ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToNav1_3 = () => {
        nav1_3Ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToNav3 = () => {
        nav3Ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

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
                templateColumns={{ base: "1fr", medium: "1fr 1fr 1fr" }}
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
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Image src={logo} alt="Logo" height="80px" />
                            <Text className="appTitle" fontSize="2rem" color="white" fontWeight="bold" fontStyle="italic" paddingLeft="25px" paddingTop="10px"
                                  style={{
                                      textShadow: '0px 0px 5px rgba(255, 255, 255, 0.8)' // Sombra inset
                                  }}
                            > PokerCrushers.pro</Text>
                        </div>
                        <div  className="desktop-menu" gap="1rem">
                            <Link href="#nav1" color="white">
                                <FontAwesomeIcon icon="question" /> Por qué Poker Crushers
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
                        </div>
                        <div className="mobile-menu-icon" onClick={toggleMenu}>
                            {menuOpen ? <FaTimes color="white" size="1.5rem" /> : <FaBars color="white" size="1.5rem" />}
                        </div>
                    </Flex>
                    {menuOpen && (
                        <Flex className="mobile-menu" direction="column" gap="1rem" backgroundColor={tokens.colors.font.primary.value} padding="1rem">
                            <Link href="#nav1" color="white" onClick={toggleMenu}>
                                <FontAwesomeIcon icon="question" /> Por qué Poker Crushers
                            </Link>
                            <Link href="#nav2" color="white" onClick={toggleMenu}>
                                <FontAwesomeIcon icon="star" /> Características
                            </Link>
                            <Link href="#nav3" color="white" onClick={toggleMenu}>
                                <FontAwesomeIcon icon="tag" /> Precios
                            </Link>
                            <Link href="#nav4" color="white" onClick={toggleMenu}>
                                <FontAwesomeIcon icon="right-to-bracket" /> Ingresar
                            </Link>
                        </Flex>
                    )}
                </Card>
                <Card
                    padding="0px"
                    columnStart="1"
                    columnEnd="-1"
                    height="100%"
                >
                    <div id="nav0" style={{ height: '100%', color: '#333', backgroundColor: '#0d1926' }} >
                        <Grid templateColumns={{ base: "1fr", medium: "1fr 1fr" }} gap="2rem">
                            <div className="container-details">
                                <div className="details">
                                    <Text fontSize="4rem" color="white" fontWeight="bold">Conviértete en un Crusher del Poker </Text>
                                    <Text fontSize="1.5rem">
                                        Estudia, entrena y domina las adaptaciones explotativas que utilizan los mejores jugadores de poker online.
                                    </Text>
                                    <Text fontSize="1.5rem">
                                        No juegues como una máquina, juega como los pro.
                                    </Text>
                                </div>
                                <button style={{ marginBottom: '50px', borderRadius: '25px', marginTop: '50px', width: '300px', height: '50px', backgroundColor: '#00ECB3', fontWeight: 'bold' }} onClick={scrollToNav4}>Crea tu cuenta</button>
                            </div>
                            <div style={{ textAlign: 'center', paddingTop: '100px' }}>
                                <Image
                                    src={pokerplayer}
                                    width="50%"
                                    borderRadius="10px"
                                />
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
                    <div id="nav1" style={{ height: '500px', color: '#333', backgroundColor: '#fff', padding: '4rem 2rem', textAlign: 'left' }}>
                        <Grid templateColumns={{ base: "1fr", medium: "1fr 1fr" }} gap="2rem">
                            <div style={{ textAlign: 'center' }}>
                                <Image
                                    src={home1}
                                    width="50%"
                                    borderRadius="10px"
                                />
                            </div>
                            <div>
                                <Text fontSize="3rem" style={{ color: '#333', fontWeight: 'bold' }}>
                                    Por qué Elegir PokerCrushers.pro
                                </Text>
                                <Text fontSize="1.25rem" style={{ color: '#333' }}>
                                    Deja de seguir estrategias genéricas... PokerCrushers.pro te ayuda a estudiar y aprender las adaptaciones reales que utilizan los mejores jugadores para "aplastar" a sus oponentes en el poker online. Aquí no solo aprenderás teoría; aprenderás a ganar.
                                </Text>
                                <button style={{ borderRadius: '25px', marginTop: '20px', width: '200px', height: '40px', backgroundColor: '#00ECB3', fontWeight: 'bold' }} onClick={scrollToNav4}>Crea tu cuenta</button>
                                <button style={{ marginLeft: '10px', borderRadius: '25px', marginTop: '20px', width: '200px', height: '40px', backgroundColor: '#fff', color: '#333', fontWeight: 'bold', border: '1px solid #333' }} onClick={scrollToNav1_3}>Más información</button>
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
                    <div id="nav1_1" style={{ height: '500px', color: '#333', backgroundColor: '#fff', padding: '4rem 2rem', textAlign: 'left' }}>
                        <Grid templateColumns={{ base: "1fr", medium: "1fr 1fr" }} gap="2rem">
                            <div>
                                <Text fontSize="3rem" style={{ color: '#333', fontWeight: 'bold' }}>
                                    Organiza tu estudio Hoy
                                </Text>
                                <Text fontSize="1.25rem" style={{ color: '#333', marginTop: '10px', textAlign: 'justify' }}>
                                    Únete a PokerCrushers.pro y comienza a estudiar, entrenar y ganar como un verdadero crusher. No esperes más, regístrate ahora y lleva tu juego al siguiente nivel.
                                </Text>
                                <button style={{ borderRadius: '25px', marginTop: '20px', width: '200px', height: '40px', backgroundColor: '#00ECB3', fontWeight: 'bold' }} onClick={scrollToNav4}>Crea tu cuenta</button>
                                <button style={{ marginLeft: '10px', borderRadius: '25px', marginTop: '20px', width: '200px', height: '40px', backgroundColor: '#fff', color: '#333', fontWeight: 'bold', border: '1px solid #333' }} onClick={scrollToNav1_3}>Más información</button>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <Image
                                    src={home2}
                                    height="50%"
                                    borderRadius="10px"
                                />
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
                    <div id="nav1_2" style={{ height: '500px', color: '#333', backgroundColor: '#fff', padding: '4rem 2rem', textAlign: 'left' }}>
                        <Grid templateColumns={{ base: "1fr", medium: "1fr 1fr" }} gap="2rem">
                            <div style={{ textAlign: 'center' }}>
                                <Image
                                    src={home3}
                                    height="50%"
                                    borderRadius="10px"
                                />
                            </div>
                            <div>
                                <Text fontSize="3rem" style={{ color: '#333', fontWeight: 'bold' }}>
                                    ¿Estás listo para dominar el poker?
                                </Text>
                                <Text fontSize="1.25rem" style={{ color: '#333', marginTop: '10px', textAlign: 'justify' }}>
                                    No te conformes con ser un jugador promedio. Con PokerCrushers.pro, aprenderás a estudiar de manera eficiente, adaptarte y superar a tus oponentes con estrategias probadas. Inscríbete ahora y empieza a ganar.
                                </Text>
                                <button style={{ borderRadius: '25px', marginTop: '20px', width: '200px', height: '40px', backgroundColor: '#00ECB3', fontWeight: 'bold' }} onClick={scrollToNav4}>Crea tu cuenta</button>
                                <button style={{ marginLeft: '10px', borderRadius: '25px', marginTop: '20px', width: '200px', height: '40px', backgroundColor: '#fff', color: '#333', fontWeight: 'bold', border: '1px solid #333' }} onClick={scrollToNav1_3}>Más información</button>
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
                    <div id="nav1_3" ref={nav1_3Ref} style={{ height: '100%', color: '#333', backgroundColor: '#32414A', padding: '4rem 2rem', textAlign: 'justify' }}>
                        <Grid templateColumns={{ base: "1fr", medium: "1fr 1fr" }} gap="2rem">
                            <div>
                                <Text fontSize="3rem" style={{ marginTop: '10px', fontWeight: 'bold' }}>
                                    Beneficios Clave:
                                </Text>
                                <Text fontSize="1.25rem" style={{ marginTop: '10px', color: '#00ECB3' }}>
                                    1. Registro Estructurado de tus Coachings:
                                </Text>
                                <Text fontSize="1.25rem" style={{ marginTop: '10px' }}>
                                    Registra y organiza todo lo que aprendes en tus sesiones de coaching. Nunca más olvides una estrategia o un detalle importante.
                                </Text>
                                <Text fontSize="1.25rem" style={{ marginTop: '10px', color: '#00ECB3' }}>
                                    2. Entrenamiento Práctico y Efectivo:
                                </Text>
                                <Text fontSize="1.25rem" style={{ marginTop: '10px' }}>
                                    Repasa y entrena tus manos en nuestro replayer avanzado, adaptando las estrategias a tu propio estilo de juego y mejorando con cada sesión.
                                </Text>
                                <Text fontSize="1.25rem" style={{ marginTop: '10px', color: '#00ECB3' }}>
                                    3. Estrategias Reales de los Mejores Jugadores:
                                </Text>
                                <Text fontSize="1.25rem" style={{ marginTop: '10px' }}>
                                    Aprende directamente de las manos y adaptaciones que utilizan los crushers en cada nivel de juego. Con PokerCrushers.pro, estarás un paso adelante de la competencia.
                                </Text>
                                <button style={{ borderRadius: '25px', marginTop: '20px', width: '200px', height: '40px', backgroundColor: '#00ECB3', fontWeight: 'bold' }} onClick={scrollToNav4}>Crea tu cuenta</button>

                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Image
                                    src={splashMision}
                                    style={{ width: '80%', borderRadius: '10px' }}
                                />
                                <Image
                                    src={splashMision2}
                                    style={{ width: '80%', borderRadius: '10px', marginTop: '-150px', marginLeft: '70px' }} // Ajusta marginLeft según sea necesario
                                />
                                <Image
                                    src={splashMision3}
                                    style={{ width: '80%', borderRadius: '10px', marginTop: '-150px', marginLeft:'150px' }}
                                />
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
                    <div id="nav2" style={{ height: '100%', color: 'black', backgroundColor: '#f1f1f1', padding: '4rem 2rem' }}>
                        <Grid templateColumns={{ base: "1fr", medium: "repeat(4, 1fr)" }} gap="2rem">
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
        <div id="nav3" ref={nav3Ref} style={{ height: '100%', color: 'black', backgroundColor: 'white', padding: '4rem 2rem' }}>
            <Text fontSize="2rem" style={{ color: '#00ECB3', fontWeight: 'bold' }}>
                ¡Ingresa, Estudia y Gana!
            </Text>
            <Text fontSize="1.25rem" style={{ color: '#333', fontWeight: 'bold', marginBottom: '20px' }}>
                Accede a las herramientas, estrategias y entrenamientos que te harán destacar en la mesa. Suscríbete hoy y conviértete en el jugador que siempre has querido ser.
            </Text>
            <Grid templateColumns={{ base: "1fr", medium: "repeat(3, 1fr)" }} gap="2rem">
                {[
                    { plan: "Plan Básico", priceRef: "USD 55 / mes",price: "GRATIS",reason:"", stack: [
                            { description: "Metodología efectiva de aprendizaje", value:"USD 30"},
                        { description: "Módulo de notas", value:"USD 10"},
                            { description: "Módulo de entrenamiento", value:"USD 15"},

                        ]},
                    { plan: "Plan PRO", priceRef: "USD 95 / mes",price: "USD 10 / mes",reason:"Aprovecha esta oferta de lanzamiento a sólo", stack: [
                            { description: "Metodología efectiva de aprendizaje", value:"USD 30"},
                            { description: "Módulo de notas", value:"USD 10"},
                            { description: "Módulo de entrenamiento manos propias", value:"USD 15"},
                            { description: "Manos de entrenaminento manos pre-configuradas", value:"USD 30"},
                            { description: "Soporte 8x5", value:"USD 10"},

                        ]},
                    { plan: "Plan Premium", priceRef: "USD 135 / mes",price: "USD 25 / mes",reason:"Aprovecha esta oferta de lanzamiento a sólo", stack: [
                            { description: "Metodología efectiva de aprendizaje", value:"USD 30"},
                            { description: "Módulo de notas", value:"USD 10"},
                            { description: "Módulo de entrenamiento manos propias", value:"USD 15"},
                            { description: "Manos de entrenaminento manos pre-configuradas", value:"USD 30"},
                            { description: "Soporte 8x5", value:"USD 10"},
                            { description: "Módulo análisis de spots y acciones", value:"USD 30"},
                            { description: "Aprendizaje Gamificado (Ranking)", value:"USD 10"},
                        ]},
                ].map((item, index) => (
                    <Flex key={index} direction="column" alignItems="center" padding="2rem" border="1px solid #00ECB3" borderRadius="10px" backgroundColor={item.plan === 'Plan Básico' ? '#fffede' : "#f9f9f9"}>
                        <Text fontSize="1.5rem" fontWeight="bold" color="#000">{item.plan}</Text>
                        <Text fontSize="1rem" textAlign="center" marginTop="0.5rem" color='black' style={{ whiteSpace: 'pre-line' }}>
                        {item.stack.map((stackItem,index) => (
                            <p>
                       <FontAwesomeIcon icon={faCheck} size="1x" /> {stackItem.description} ({stackItem.value})
                            </p>
                            ))}
                            </Text>
                        <Text fontSize="1.25rem" fontWeight="bold" color="#000" textDecoration="line-through" marginTop="0.5rem">{item.priceRef}</Text>
                        <Text fontSize="1.25rem" fontWeight="bold" color="#000" marginTop="0.5rem">{item.reason}</Text>
                        <Text fontSize="1.55rem" fontWeight="bold" color={item.plan === 'Plan Básico' ? '#ff116e' : "#039370"} marginTop="0.5rem">{item.price}</Text>
                        <button onClick={scrollToNav4}>Ingresar</button>
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
        <div id="nav4" ref={nav4Ref}>
            <Grid templateColumns={{ base: "1fr", medium: "1fr 1fr" }}>
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
                    <div style={{
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
                        <TextCarousel messages={messages} />
                    </div>
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
        height="100%"
    >
        <div id="studypoker"  style={{ height: '100%', color: 'black', backgroundColor: 'white', padding: '4rem 2rem' }}>
            <Text fontSize="2rem" style={{ color: '#00ECB3', fontWeight: 'bold' }}>
                ¿Como hacer más eficiente mi Metodología de Estudio para el Poker?
            </Text>
            <Text fontSize="1.25rem" style={{ color: '#333', fontWeight: 'normal', marginBottom: '20px', marginTop:'20px' }}>
                En el competitivo mundo del poker, donde cada decisión puede ser la diferencia entre ganar o perder, una metodología de estudio eficiente es crucial. Una que esté diseñada específicamente para optimizar el aprendizaje y la mejora continua en el poker, que esté basada en técnicas probadas que hayan demostrado mejorar significativamente la comprensión y retención de estrategias y conceptos del juego. Aquí exploramos los aspectos fundamentales de nuestra metodología y por qué son tan efectivos para los jugadores de poker.
            </Text>
            <Grid templateColumns={{ base: "1fr", medium: "repeat(3, 1fr)" }} gap="2rem">

                    <Flex direction="column" alignItems="center"  padding="2rem">
                        <div style={{ textAlign: 'center' }}>
                            <Image
                                src={article1}
                                height="3
                                00px"
                                borderRadius="10px"
                            />
                        </div>

                        <button onClick={scrollToNav1_3}>QUIERO SABER MÁS</button>

                    </Flex>
                <Flex direction="column" alignItems="center" padding="2rem">
                    <Text fontSize="1.25rem" fontWeight="bold" textDecoration="underline" color="#000">
                        1. Notas Activas
                    </Text>
                    <Text fontSize="1.25rem" fontWeight="normal" color="#000">
                        <span className="subtituloArticulo">Tomar Notas a Mano: </span>
                        Escribir notas a mano sobre tus sesiones de juego y análisis de manos puede ser más beneficioso para la retención de estrategias. El proceso de escribir a mano involucra una elaboración más profunda del contenido, lo que facilita la memorización y comprensión de las estrategias y patrones de juego.
                    </Text>
                    <Text fontSize="1.25rem" fontWeight="normal" color="#000">
                        <span className="subtituloArticulo">Reformulación:</span> En lugar de transcribir lo que lees o escuchas de manera literal, reformula el contenido con tus propias palabras. Esta técnica obliga al cerebro a procesar la información de una manera más activa, ayudando a consolidar el aprendizaje de estrategias complejas y escenarios de juego específicos.
                    </Text>
                    <Text fontSize="1.25rem" fontWeight="bold" textDecoration="underline" color="#000">
                        2. Escritura Explicativa
                    </Text>
                    <Text fontSize="1.25rem" fontWeight="normal" color="#000">
                        Consiste en escribir explicaciones detalladas de las estrategias de poker como si estuvieras enseñando a alguien más (Técnica Feynman), es una herramienta poderosa. Este método no solo fortalece tu comprensión de los conceptos del juego, sino que también identifica lagunas en tu conocimiento, permitiéndote abordarlas de manera precisa.

                    </Text>
                    <Text fontSize="1.25rem" fontWeight="bold" textDecoration="underline" color="#000">
                        3. Pruebas Prácticas
                    </Text>
                    <Text fontSize="1.25rem" fontWeight="normal" color="#000">
                        <span className="subtituloArticulo">Autoevaluación:</span> Realizar pruebas de práctica y autoevaluaciones regularmente es fundamental para el aprendizaje efectivo en el poker. Estas pruebas te ayudan a identificar áreas que necesitan mejora, así como a reforzar lo que ya has aprendido, consolidando el conocimiento en tu memoria a largo plazo.
                    </Text>
                    <Text fontSize="1.25rem" fontWeight="normal" color="#000">
                        <span className="subtituloArticulo">Resolución de Problemas:</span> Trabajar en problemas prácticos y aplicados, como analizar manos jugadas y simular diferentes escenarios de juego, permite poner en práctica lo aprendido. Este enfoque práctico asegura que el conocimiento no se quede en un nivel teórico, sino que se traduzca en habilidades aplicables en las mesas.
                    </Text>


                </Flex>
                <Flex direction="column" alignItems="center" padding="2rem">
                    <Text fontSize="1.25rem" fontWeight="bold" textDecoration="underline" color="#000">
                        4. Espaciado y Repetición
                    </Text>
                    <Text fontSize="1.25rem" fontWeight="normal" color="#000">
                        <span className="subtituloArticulo">Espaciado:</span> Distribuir el estudio a lo largo del tiempo, en lugar de realizar sesiones intensivas, ésta es una estrategia crucial. El aprendizaje espaciado aprovecha la forma en que el cerebro procesa y almacena información, mejorando la retención y evitando la sobrecarga cognitiva.
                    </Text>
                    <Text fontSize="1.25rem" fontWeight="normal" color="#000">
                        <span className="subtituloArticulo">Repetición Espaciada:</span> Revisar las estrategias y análisis de manos en intervalos crecientes es una técnica que maximiza la retención a largo plazo. Esta metodología, respaldada por investigaciones en neurociencia, asegura que la información se consolide en la memoria, reduciendo la probabilidad de olvido y mejorando la toma de decisiones en tiempo real.

                    </Text>
                    <Text fontSize="1.25rem" fontWeight="bold" textDecoration="underline" color="#000">
                        Conclusión
                    </Text>
                    <Text fontSize="1.25rem" fontWeight="normal" color="#000">
                        La metodología de estudio propuesta por nuestra app combina estas técnicas que han sido validadas por la investigación científica para ofrecer un enfoque integral y eficiente para los jugadores de poker.
                    </Text>
                    <Text fontSize="1.25rem" fontWeight="normal" color="#000">
                        Al integrar Notas Activas, Escritura Explicativa, Pruebas Prácticas, y estrategias de Espaciado y Repetición, nuestra app no solo mejora la retención y comprensión de las estrategias de poker, sino que también facilita un aprendizaje más profundo y duradero.
                    </Text>
                    <Text fontSize="1.25rem" fontWeight="normal" color="#000">
                        Esta combinación de técnicas asegura que los jugadores no solo adquieran conocimientos, sino que también desarrollen habilidades críticas y aplicables en el mundo real del poker.
                    </Text>
                    <button onClick={scrollToNav3}>ESTOY LISTO PARA MEJORAR MI METODOLOGÍA</button>
                </Flex>

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
