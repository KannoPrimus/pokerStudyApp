import React, { useState, useEffect } from 'react';
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';

const Tutorial = ({skipTutorial}) => {
    const [run, setRun] = useState(false);
    const [steps, setSteps] = useState([]);

    useEffect(() => {
        // Simula una carga asíncrona de componentes
        setTimeout(() => {
            setSteps([
                {
                    content: (
                        <div>
                            Asegurate de estar en el modo ESTUDIO.
                            <br />

                        </div>
                    ),
                    disableBeacon: true,
                    disableOverlayClose: true,
                    hideCloseButton: true,
                    hideFooter: false,
                    placement: 'right',
                    spotlightClicks: false,
                    styles: {
                        options: {
                            zIndex: 10000,
                        },
                    },
                    target: '.mode-switch',
                    title: '¿COMO REGISTRO MIS MANOS?',

                }, // INICIO
                {
                    content: (
                        <div>
                            <u><b>Haz click en cualquier posición</b></u> para definir los asientos de los jugardores.
                            <br /><br />
                            <b>Tips:</b> Para cambiar las posiciones primero haz click sobre una de las ya seleccionadas.
                            <br /><br />
                            <b>Importante:</b> Al cambiar las posiciones, las acciones en cada calle se borrarán.
                        </div>
                    ),
                        disableBeacon: true,
                    disableOverlayClose: true,
                    hideCloseButton: true,
                    hideFooter: false,
                    placement: 'right',
                    spotlightClicks: true,
                    styles: {
                    options: {
                        zIndex: 10000,
                    },
                },
                    target: '.poker-table-container',
                    title: 'Selección de posisciones',
                },// SELECCION POSICIONES
                {
                    content: (
                        <div>
                            <u><b>Define el Stake</b></u> al que corresponde la mano que quieres registrar.
                        </div>
                    ),
                    disableBeacon: true,
                    disableOverlayClose: true,
                    hideCloseButton: true,
                    hideFooter: false,
                    placement: 'right',
                    spotlightClicks: true,
                    styles: {
                        options: {
                            zIndex: 10000,
                        },
                    },
                    target: '.Stake',
                    title: 'Selección de Stake o Nivel',
                }, //SELECCION STAKE
                {
                    content: (
                        <div>
                            <u><b>Define el Spot</b></u> al que corresponde la mano que quieres registrar.
                            <br /><br />
                            <b>Importante:</b> Este campo es obligatorio!
                        </div>
                    ),
                    disableBeacon: true,
                    disableOverlayClose: true,
                    hideCloseButton: true,
                    hideFooter: false,
                    placement: 'right',
                    spotlightClicks: true,
                    styles: {
                        options: {
                            zIndex: 10000,
                        },
                    },
                    target: '.Spot',
                    title: 'Selección de Spot o secuencia',
                },//SELECCION SPOT
                {
                    content: (
                        <div>
                            Aquí puedes <u><b>agregar información adicional</b></u> que quieras registrar sobre la mano.
                            <br /><br />
                            <b>Por ejemplo:</b>
                            <br /><br />
                            Tipo de jugador, stats, sala o nick del jugador que estoy analizando.
                        </div>
                    ),
                    disableBeacon: true,
                    disableOverlayClose: true,
                    hideCloseButton: true,
                    hideFooter: false,
                    placement: 'right',
                    spotlightClicks: true,
                    styles: {
                        options: {
                            zIndex: 10000,
                        },
                    },
                    target: '.Description',
                    title: 'Información adicional de la mano',
                },//DESCRIPCION
                {
                    content: (
                        <div>
                            <u><b>Selecciona la mano</b></u> de Hero, define las acciones de ambos jugadores y deja las notas de tu coach o las tuyas registradas.
                            <br /><br />
                            <b>Tips:</b>
                            <br /><br />
                            Haz click derecho sobre una carta para limpiarla.
                            <br /><br />
                            Pide una sugerencia de Notas a nuestro Asistente virtual. (Experimental)
                            <br /><br />
                            La matriz de rango puede cambiar de color haciendo varios clicks en la misma celda.
                            <br /><br />
                            Para pintar una zona de la matriz, simplemente deja apretado el botón derecho del ratón.
                        </div>
                    ),
                    disableBeacon: true,
                    disableOverlayClose: true,
                    hideCloseButton: true,
                    hideFooter: false,
                    placement: 'right',
                    spotlightClicks: true,
                    styles: {
                        options: {
                            zIndex: 10000,
                        },
                    },
                    target: '.street-Preflop',
                    title: 'Agregar información de la calle Preflop',
                },//CONFIGURACION PREFLOP

                {
                    content: (
                        <div>
                            <u><b>Repite el proceso</b></u> para la calle del flop.

                        </div>
                    ),
                    disableBeacon: true,
                    disableOverlayClose: true,
                    hideCloseButton: true,
                    hideFooter: false,
                    placement: 'right',
                    spotlightClicks: true,
                    styles: {
                        options: {
                            zIndex: 10000,
                        },
                    },
                    target: '.street-Flop',
                    title: 'Agregar información de la calle Flop',
                },//SELECCION ACCIONES FLOP
                {
                    content: (
                        <div>
                            <u><b>Repite el proceso</b></u> para la calle del turn.

                        </div>
                    ),
                    disableBeacon: true,
                    disableOverlayClose: true,
                    hideCloseButton: true,
                    hideFooter: false,
                    placement: 'right',
                    spotlightClicks: true,
                    styles: {
                        options: {
                            zIndex: 10000,
                        },
                    },
                    target: '.street-Turn',
                    title: 'Agregar información de la calle Turn',
                },//SELECCION ACCIONES TURN
                {
                    content: (
                        <div>
                            <u><b>Repite el proceso</b></u> para la calle del river.

                        </div>
                    ),
                    disableBeacon: true,
                    disableOverlayClose: true,
                    hideCloseButton: true,
                    hideFooter: false,
                    placement: 'right',
                    spotlightClicks: true,
                    styles: {
                        options: {
                            zIndex: 10000,
                        },
                    },
                    target: '.street-River',
                    title: 'Agregar información de la calle River',
                },//SELECCION ACCIONES RIVER
                {
                    content: (
                        <div>
                            <u><b></b></u> de Hero y villano.

                        </div>
                    ),
                    disableBeacon: true,
                    disableOverlayClose: true,
                    hideCloseButton: true,
                    hideFooter: false,
                    placement: 'right',
                    spotlightClicks: true,
                    styles: {
                        options: {
                            zIndex: 10000,
                        },
                    },
                    target: '.save-button',
                    title: 'Guardar la inforamción',
                },//GUARDAR MIS MANOS
                {
                    content: (
                        <div>
                            <u><b>Haz click en el cuadro de busqueda</b></u> para obtener el listado de tus manos guardadas.
                            <br /><br />
                            Tip:
                            <br /><br />
                            Ingresa un spot o alguna palabra clave que exista en la descripción de las manos guardadas.
                        </div>
                    ),
                    disableBeacon: true,
                    disableOverlayClose: true,
                    hideCloseButton: true,
                    hideFooter: false,
                    placement: 'right',
                    spotlightClicks: true,
                    styles: {
                        options: {
                            zIndex: 10000,
                        },
                    },
                    target: '.search-box',
                    title: 'Buscar mis manos guardadas',
                },//BUSCAR MIS MANOS

            ]);
            setRun(true); // Inicia el recorrido después de que los pasos estén listos
        }, 300); // Ajusta el tiempo según tu necesidad
    }, []);

    const handleJoyrideCallback = (data) => {
        const { status, action } = data;
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            setRun(false);
        } else if (action === ACTIONS.CLOSE) {
            setRun(false);
        }
    };

    if (skipTutorial==='false'){
        console.log('Tutorial:',skipTutorial);
        return (
            <div>
                <Joyride
                    steps={steps}
                    continuous
                    scrollToFirstStep
                    showProgress
                    showSkipButton
                    run={run}
                    callback={handleJoyrideCallback}
                />
            </div>
        );
    }
};

export default Tutorial;
