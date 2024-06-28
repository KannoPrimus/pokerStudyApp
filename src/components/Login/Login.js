import React, { useRef } from 'react';
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
    Link
} from "@aws-amplify/ui-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Footer as Footerweb } from "../Footer/Footer";
import { SignInHeader } from "./SignInHeader";
import { SignInFooter } from "./SignInFooter";
import splash from "../../assets/imagenLogin.png";
import splashMision from "../../assets/Poker Crushers - Study mode.jpg";
import splashMision2 from "../../assets/Poker Crushers - Trainer mode.jpg";
import pokerplayer from "../../assets/pokerplayer_crusher.png";
import home1 from "../../assets/home_1.png";
import home2 from "../../assets/home_2.png";
import home3 from "../../assets/home_3.png";
import logo from "../../assets/logoPSA_soloPica.png";
import TextCarousel from "./TextCarousel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the necessary CSS styles
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLightbulb, faBook, faMicrochip, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
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
    const nav1_3Ref = useRef(null);

    const scrollToNav4 = () => {
        nav4Ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToNav1_3 = () => {
        nav1_3Ref.current.scrollIntoView({ behavior: 'smooth' });
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
                        <div style={{ display: 'flex', justifyContent: 'center'}}>
                            <Image src={logo} alt="Logo"  height="80px" />
                            <Text fontSize="3rem" color="white" fontWeight="bold" fontStyle="italic" paddingLeft="25px"
                                  style={{
                                      textShadow: '0px 0px 5px rgba(255, 255, 255, 0.8)' // Sombra inset
                                  }}
                            > PokerCrushers.pro</Text>
                        </div>
                        <Flex gap="1rem">
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
                        </Flex>
                    </Flex>
                </Card>
                <Card
                    padding="0px"
                    columnStart="1"
                    columnEnd="-1"
                    height="100%"
                >
                    <div id="nav0" style={{ height: '100%', color: '#333', backgroundColor: '#0d1926'}} >
                        <Grid templateColumns="1fr 1fr" gap="2rem">
                            <div className="container-details">
                                <div className="details">
                                    <Text fontSize="6rem" color="white" fontWeight="bold">Conviértete en un Crusher del Poker </Text>
                                    <Text fontSize="1.5rem">
                                        No juegues como una máquina, juega como los pro.
                                    </Text>
                                    <Text fontSize="1.5rem">
                                        Aprende, entrena y domina las adaptaciones explotativas que utilizan los mejores jugadores de poker online.
                                    </Text>

                                </div>
                                <button style={{marginBottom:'50px',borderRadius:'25px', marginTop:'50px', width:'300px', height: '50px', backgroundColor: '#00ECB3',fontWeight:'bold'}} onClick={scrollToNav4}>Crea tu cuenta</button>
                            </div>
                            <div style={{textAlign:'center',paddingTop:'100px'}}>
                                <Image
                                    src={pokerplayer}
                                    width="80%"
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
                    <div id="nav1" style={{ height: '100%', color: '#333', backgroundColor: '#fff', padding: '8rem',textAlign:'left' }}>
                        <Grid templateColumns="1fr 1fr" gap="2rem">
                            <div style={{textAlign:'center'}}>
                                <Image
                                    src={home1}
                                    width="80%"

                                    borderRadius="10px"
                                />

                            </div>
                            <div>
                                <Text fontSize="5rem" style={{color: '#333',fontWeight:'bold'}} >
                                    Por qué Elegir PokerCrushers.pro
                                </Text>
                                <Text fontSize="1.25rem" style={{color: '#333'}}>
                                    Deja de seguir estrategias genéricas... PokerCrushers.pro te enseña las adaptaciones reales que utilizan los mejores jugadores para "aplastar" a sus oponentes en el poker online. Aquí no solo aprenderás teoría; aprenderás a ganar.
                                </Text>
                                <button style={{borderRadius:'25px', marginTop:'50px', width:'300px', height: '50px', backgroundColor: '#00ECB3',fontWeight:'bold'}} onClick={scrollToNav4}>Crea tu cuenta</button>
                                <button style={{marginLeft:'20px',borderRadius:'25px', marginTop:'50px', width:'300px', height: '50px', backgroundColor: '#fff',color:'#333',fontWeight:'bold',border:'1px solid #333'}} onClick={scrollToNav1_3}>Más información</button>
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
                    <div id="nav1_1" style={{ height: '100%', color: '#333', backgroundColor: '#fff', padding: '8rem',textAlign:'left' }}>
                        <Grid templateColumns="1fr 1fr" gap="2rem">
                            <div>
                                <Text fontSize="5rem" style={{color: '#333',fontWeight:'bold'}} >
                                    Transforma tu Juego Hoy
                                </Text>
                                <Text fontSize="1.25rem" style={{color: '#333',marginTop:'10px',textAlign:'justify'}}>
                                    Únete a PokerCrushers.pro y comienza a estudiar, entrenar y ganar como un verdadero crusher. No esperes más, regístrate ahora y lleva tu juego al siguiente nivel.
                                </Text>
                                <button style={{borderRadius:'25px', marginTop:'50px', width:'300px', height: '50px', backgroundColor: '#00ECB3',fontWeight:'bold'}} onClick={scrollToNav4}>Crea tu cuenta</button>
                                <button style={{marginLeft:'20px',borderRadius:'25px', marginTop:'50px', width:'300px', height: '50px', backgroundColor: '#fff',color:'#333',fontWeight:'bold',border:'1px solid #333'}} onClick={scrollToNav1_3}>Más información</button>
                            </div>
                            <div style={{textAlign:'center'}}>
                                <Image
                                    src={home2}

                                    height="80%"
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
                    <div id="nav1_2" style={{ height: '100%', color: '#333', backgroundColor: '#fff', padding: '8rem',textAlign:'left' }}>
                        <Grid templateColumns="1fr 1fr" gap="2rem">
                            <div style={{textAlign:'center'}}>
                                <Image
                                    src={home3}

                                    height="80%"
                                    borderRadius="10px"
                                />

                            </div>
                            <div>
                                <Text fontSize="5rem" style={{color: '#333',fontWeight:'bold'}} >
                                             ¿Estás listo para dominar el poker?
                                </Text>
                                <Text fontSize="1.25rem" style={{color: '#333',marginTop:'10px',textAlign:'justify'}}>
                                    No te conformes con ser un jugador promedio. Con PokerCrushers.pro, aprenderás a adaptarte y a superar a tus oponentes con estrategias probadas. Inscríbete ahora y empieza a ganar.
                                </Text>
                                <button style={{borderRadius:'25px', marginTop:'50px', width:'300px', height: '50px', backgroundColor: '#00ECB3',fontWeight:'bold'}} onClick={scrollToNav4}>Crea tu cuenta</button>
                                <button style={{marginLeft:'20px',borderRadius:'25px', marginTop:'50px', width:'300px', height: '50px', backgroundColor: '#fff',color:'#333',fontWeight:'bold',border:'1px solid #333'}} onClick={scrollToNav1_3}>Más información</button>
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
                    <div id="nav1_3" ref={nav1_3Ref} style={{ height: '100%', color: '#333', backgroundColor: '#32414A', padding: '8rem',textAlign:'justify' }}>
                        <Grid templateColumns="1fr 1fr" gap="2rem">
                            <div>

                                <Text fontSize="6rem" style={{marginTop:'10px',fontWeight:'bold'}}>
                                    Beneficios Clave:
                                </Text>
                                <Text fontSize="1.25rem" style={{marginTop:'10px', color: '#00ECB3'}}>
                                    1. Registro Estructurado de tus Coachings:
                                </Text>
                                <Text fontSize="1.25rem" style={{marginTop:'10px'}}>
                                    Registra y organiza todo lo que aprendes en tus sesiones de coaching. Nunca más olvides una estrategia o un detalle importante.
                                </Text>
                                <Text fontSize="1.25rem" style={{marginTop:'10px', color: '#00ECB3'}}>
                                    2. Entrenamiento Práctico y Efectivo:
                                </Text>
                                <Text fontSize="1.25rem" style={{marginTop:'10px'}}>
                                    Repasa y entrena tus manos en nuestro replayer avanzado, adaptando las estrategias a tu propio estilo de juego y mejorando con cada sesión.
                                </Text>
                                <Text fontSize="1.25rem" style={{marginTop:'10px', color: '#00ECB3'}}>
                                    3. Estrategias Reales de los Mejores Jugadores:
                                </Text>
                                <Text fontSize="1.25rem" style={{marginTop:'10px'}}>
                                    Aprende directamente de las manos y adaptaciones que utilizan los crushers en cada nivel de juego. Con PokerCrushers.pro, estarás un paso adelante de la competencia.
                                </Text>


                                <button style={{borderRadius:'25px', marginTop:'50px', width:'300px', height: '50px', backgroundColor: '#00ECB3',fontWeight:'bold'}} onClick={scrollToNav4}>Crea tu cuenta</button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Image
                                    src={splashMision}
                                    style={{ width: '100%', borderRadius: '10px' }}
                                />
                                <Image
                                    src={splashMision2}
                                    style={{ width: '100%', borderRadius: '10px', marginTop: '-50px', marginLeft: '120px' }} // Ajusta marginLeft según sea necesario
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
                    <div id="nav2" style={{ height: '100%', color: 'black', backgroundColor: '#f1f1f1', padding: '8rem' }}>
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
                    <div id="nav3" style={{ height: '100%', color: 'black', backgroundColor: 'white', padding: '8rem' }}>
                        <Text fontSize="2rem" style={{color: '#00ECB3',fontWeight:'bold'}} >
                            ¡Ingresa, Estudia  y Gana!
                        </Text>
                        <Text fontSize="1.25rem" style={{color: '#333',fontWeight:'bold',marginBottom:'20px'}}>
                            Accede a las herramientas, estrategias y entrenamientos que te harán destacar en la mesa. Suscríbete hoy y conviértete en el jugador que siempre has querido ser.
                        </Text>
                        <Grid templateColumns="repeat(3, 1fr)" gap="2rem">
                            {[
                                { plan: "Plan Básico", price: "GRATIS", description: "Acceso al módulo de bitácora de manos." },
                                { plan: "Plan Pro", price: "9.99 USD / mes", description: "Acceso al módulo de bitácora de manos, sugerencias de notas con IA, trainer de manos propias" },
                                { plan: "Plan Premium", price: "49.99 USD / mes", description: "Acceso al módulo de bitácora de manos, sugerencias de notas con IA, trainer de manos propias, soluciones y estadísticas de manos de crushers" },
                            ].map((item, index) => (
                                <Flex key={index} direction="column" alignItems="center" padding="2rem" border="1px solid #00ECB3" borderRadius="10px" backgroundColor="#f9f9f9">
                                    <Text fontSize="1.5rem" fontWeight="bold" color= 'black'>{item.plan}</Text>
                                    <Text fontSize="1.25rem" fontWeight="bold" color="#039370" marginTop="0.5rem">{item.price}</Text>
                                    <Text fontSize="1rem" textAlign="center" marginTop="0.5rem"color= 'black'>{item.description}</Text>
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
                    height="100px"
                >
                    <Footerweb />
                </Card>
            </Grid>
        </ThemeProvider>
    );
}
