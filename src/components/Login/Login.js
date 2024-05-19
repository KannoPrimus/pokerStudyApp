import React from 'react';
import {
    Authenticator,
    Flex,
    Grid,
    Image,
    ThemeProvider,
    createTheme,
    useTheme,
    View
} from "@aws-amplify/ui-react";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { SignInHeader } from "./SignInHeader";
import { SignInFooter } from "./SignInFooter";
import splash from "../../assets/imagenLogin.png";
import TextCarousel from "./TextCarousel";

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
        <Grid templateColumns={{ base: "1fr", medium: "1fr 1fr" }}>
            <Flex
                backgroundColor="#000F18"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <ThemeProvider theme={myTheme}>
                    <Authenticator components={components}>
                        {({ signOut, user }) => (
                            <main>
                                <h1>Hello {user.username}</h1>
                                <button onClick={signOut}>Salir</button>
                            </main>
                        )}
                    </Authenticator>
                </ThemeProvider>
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
    );
}
