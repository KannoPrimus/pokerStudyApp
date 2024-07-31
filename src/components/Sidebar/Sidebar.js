// Sidebar.js

import React, { useState, useEffect, useContext } from 'react';
import './Sidebar.css';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { PokerHandContext } from '../PokerHandContext/PokerHandContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { createMembers, updateMembers } from "../../graphql/mutations";
import { generateClient } from "aws-amplify/api";
import { addMonths, format } from 'date-fns';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PokerTable from '../PokerTable/PokerTable';

const client = generateClient();

const pokerSequences = [
    'Juego IP as PFR',
    'Juego OOP as PFR',
    '3bets IP',
    '3bets OOP',
    'Call 3bets IP',
    'Call 3bets OOP',
    'SB vs BB',
    'BB vs SB',
    'BB defend OOP',
    'Squeeze pots',
    '4bets IP',
    '4bets OOP',
    'Call 4bets IP',
    'Call 4bets OOP',
    'Cold call IP'
];

const pokerStakes = [
    'NL2',
    'NL5',
    'NL10',
    'NL25',
    'NL50',
    'NL100',
    'NL200',
    'NL400+',
];

const handSources = [
    { value: 'playerHands', label: 'Mis manos' },
    { value: 'sharedHands', label: 'Crushers del nivel' }
];

library.add(fas);

function Sidebar({ mode, setMode, sequence, setSequence, membership, stake, setStake, skipTutorialMember }) {
    const [handTitle, setHandTitle] = useState('');
    const [handStake, setHandStake] = useState('');
    const [description, setDescription] = useState('');
    const [isShareable, setIsShareable] = useState(false);
    const [showUpsellModal, setShowUpsellModal] = useState(false);
    const [isUpgraded, setIsUpgraded] = useState(false);
    const [handSource, setHandSource] = useState('playerHands');
    const [skipTutorial, setSkipTutorial] = useState(skipTutorialMember.toLowerCase?.() === 'true'); // Nuevo estado
    const [filterActive, setFilterActive] = useState(false); // Nuevo estado para el filtro
    const { pokerHand, updatePokerHand, resetPokerHand, fetchPokerHandsTrainer, fetchPokerHands } = useContext(PokerHandContext);
    const { user, signOut } = useAuthenticator();

    useEffect(() => {
        if (pokerHand.handTitle) {
            setHandTitle(pokerHand.handTitle);
            //setHandStake(pokerHand.stake);
            setDescription(pokerHand.description);
            setIsShareable(pokerHand.share.toLowerCase?.() === 'true');
        }else{
            setHandTitle('');
            setHandStake('');
            setDescription('');
            setIsShareable(pokerHand.share.toLowerCase?.() === 'true');
        }

    }, [pokerHand.id]);

    useEffect(() => {
        updatePokerHand('handTitle', handTitle);
    }, [handTitle]);

    useEffect(() => {
        updatePokerHand('stake', handStake);
    }, [handStake]);

    useEffect(() => {
        updatePokerHand('description', description);
    }, [description]);

    useEffect(() => {
        updatePokerHand('share', isShareable);
    }, [isShareable]);

    useEffect(() => {
        setHandTitle('');
        setHandStake('');
    }, [mode]);

    useEffect(() => {
        //console.log('Sidebar:',skipTutorialMember);
    }, []);

    const handleTitleChange = (e) => {
        fetchPokerHands(user.username, handStake, e.target.value);
        setHandTitle(e.target.value);
        setSequence(e.target.value);
    };

    const handleStakeChange = (e) => {
        setHandStake(e.target.value);
        setStake(e.target.value);
    };

    const handleDescriptionChange = (e) => {

        setDescription(e.target.value);
    };

    const handleShareableChange = (e) => {
        setIsShareable(e.target.checked);
        updatePokerHand('share', isShareable);
    };

    const handleHandSourceChange = (e) => {
        const selectedSource = e.target.value;
        if (selectedSource === 'sharedHands' && (membership === 'BASIC' || membership === 'PRO')) {
            setShowUpsellModal(true);
        } else {
            setHandSource(selectedSource);
        }
    };

    const changeMode = (newMode) => {
        if (newMode !== mode) {
            if ((newMode === 'Trainer' && membership === 'BASIC') || (newMode === 'Estadisticas' && membership === 'BASIC') || (newMode === 'Estadisticas' && membership === 'PRO')) {
                setShowUpsellModal(true);
            } else {
                setMode(newMode);
                resetPokerHand();
                setFilterActive(false);
            }
        }
    };

    const closeModal = () => {
        setShowUpsellModal(false);
        setIsUpgraded(false);
        //window.location.reload();
    };

    const activaMembresia = () => {
        window.location.reload();
    };

    const handleUpgrade = async (level) => {
        setIsUpgraded(true);
        const endDate = format(addMonths(new Date(), 1), "yyyy-MM-dd") + "Z";

        try {
            await client.graphql({
                query: updateMembers,
                variables: {
                    input: {
                        "id": user.username,
                        "playerId": user.username,
                        "memberPlan": level,
                        "endDate": endDate
                    }
                }
            });
        } catch {
            console.log('Error updating');
        }
    };

    const loadHands = () => {
        const share = handSource === 'sharedHands';
        if (handSource === 'sharedHands')
            fetchPokerHandsTrainer(handStake, handTitle, share);
        else
            fetchPokerHands(user.username, handStake, handTitle);

        setHandTitle('');
        setHandStake('');
        setFilterActive(true); // Activar el filtro
    };

    const loadAllHands = () => {
        fetchPokerHands(user.username);

        setHandTitle('');
        setHandStake('');
        setFilterActive(false); // Desactivar el filtro
    };

    const handleSkipTutorialChange = (e) => {
        setSkipTutorial(e.target.checked);

        try {
            const updateMembership = async (playerId) => {
                const newMembers = await client.graphql({
                    query: updateMembers,
                    variables: {
                        input: {
                            "id": playerId,
                            "skipTutorial": e.target.checked
                        }
                    }
                });
            };

            updateMembership(user.username);
        } catch {
            console.log('Error updating');
        }
    };

    const openPokerCrushers = () => {
        window.open("https://insigh.to/b/poker-crushers", "_blank");
    };

    return (
        <div className="sidebar">
            <div className="mode-switch">
                <div className="switch-container">
                    <button className="logout-button" onClick={signOut}>
                        <FontAwesomeIcon icon="right-from-bracket" size="1x" /> Salir
                    </button>
                    <span className="switch-label">Saltar tutorial</span>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={skipTutorial}
                            onChange={handleSkipTutorialChange}
                        />
                        <span className="slider"></span>
                    </label>
                </div>

                <h2 className="txtMembershipPlan">Plan: {membership} </h2>

                <div className="button-group">
                    <div className="tooltip">
                        <button
                            className={`mode-button-study ${mode === 'Estudio' ? 'active' : ''}`}
                            onClick={() => changeMode('Estudio')}
                        >
                            <FontAwesomeIcon icon="graduation-cap" size="1x" />
                        </button>
                        <span className="tooltip-text">Estudio</span>
                    </div>
                    <div className="tooltip">
                        <button
                            className={`mode-button-trainer ${mode === 'Trainer' ? 'active' : ''}`}
                            onClick={() => changeMode('Trainer')}
                        >
                            <FontAwesomeIcon icon="dumbbell" size="1x" />
                        </button>
                        <span className="tooltip-text">Trainer</span>
                    </div>
                    <div className="tooltip">
                        <button
                            className={`mode-button-stats ${mode === 'Estadisticas' ? 'active' : ''}`}
                            onClick={() => changeMode('Estadisticas')}
                        >
                            <FontAwesomeIcon icon="chart-simple" size="1x" />
                        </button>
                        <span className="tooltip-text">Estadísticas</span>
                    </div>
                </div>
            </div>

            <div className="mode-label">
                <span>Modo {mode}</span>
            </div>
            {mode === 'Estudio' ? (
                <>
                    <div className="txtMembershiPlan">Descripción de la mano:</div>

                </>
            ) : mode === 'Trainer' ? (
                <>
                    <div className="txtChangeMode">Fuente de manos</div>
                    <select
                        id="handSource"
                        value={handSource}
                        onChange={handleHandSourceChange}
                        className="input"
                    >
                        {handSources.map((source, index) => (
                            <option key={index} value={source.value}>{source.label}</option>
                        ))}
                    </select>
                </>
            ) : (
                <></>
            )}
            {mode !== 'Estadisticas' ? (
                <>

                    <div className="txtChangeMode">Spot</div>
                    <select
                        id="handTitle"
                        value={handTitle}
                        onChange={handleTitleChange}
                        className="input Spot"
                    >
                        <option value="" >Selecciona</option>
                        {pokerSequences.map((sequence, index) => (
                            <option key={index} value={sequence}>{sequence}</option>
                        ))}
                    </select>




                </>
            ) : (
                <></>
            )}
            {mode === 'Estudio' ? (
                <>
                    <PokerTable />
                    <textarea
                        id="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Escribe una descripción..."
                        rows="4"
                        className="input Description"
                    />
                    {membership === 'COACH' && (
                        <div className="shareable-checkbox">
                            <input
                                type="checkbox"
                                id="isShareable"
                                checked={isShareable}
                                onChange={handleShareableChange}
                            />
                            <label htmlFor="isShareable">¿Compartir?</label>
                        </div>
                    )}
                </>
            ) : mode === 'Trainer' ? (
                <>
                    {!filterActive ? (
                        <button className="loadHandsButton" onClick={loadHands}>
                            <FontAwesomeIcon icon="filter" size="1x" /> Filtrar manos
                        </button>
                    ) : (
                        <button className="loadHandsButton" onClick={loadAllHands}>
                            <FontAwesomeIcon icon="filter-circle-xmark" size="1x" /> Borrar filtro
                        </button>
                    )}
                </>
            ) : null}

            <div className="poker-crushers-button" style={{color:'#333',fontWeight:'bold'}} onClick={openPokerCrushers}>
                <FontAwesomeIcon icon="list-check" size="1x" /> Sugerencias
            </div>

            {showUpsellModal && (
                <>
                    <div className="overlay-upsell" onClick={closeModal}></div>
                    <UpsellModal onClose={closeModal} onUpgrade={handleUpgrade} isUpgraded={isUpgraded} membership={membership} activaMembresia={activaMembresia} />
                </>
            )}
        </div>
    );
}

function UpsellModal({ onClose, onUpgrade, isUpgraded, membership , activaMembresia}) {
    return (
        <div className="modalUpsell">
            <div className="modalUpsell-content">
                <span className="closeUpsell" onClick={onClose}>
                    &times;
                </span>
                {isUpgraded ? (
                    <>
                        <h2>¡Felicidades!</h2>
                        <FontAwesomeIcon icon="handshake" size="3x" />
                        <p>Has activado tu membresía por 1 mes.</p>
                        <button className="activar-membresia" onClick={activaMembresia}>
                            <FontAwesomeIcon icon="filter-circle-xmark" size="1x" /> Acceder
                        </button>
                    </>
                ) : (
                    <div className="plan-container">
                        {(membership === 'BASIC' || membership === 'FREE') && (
                            <div className="plan-crusher-pro">
                                <h2>Modo PRO</h2>
                                <p style={{ fontSize: '11px' }}>Metodología efectiva de aprendizaje (USD 30)</p>
                                <p style={{ fontSize: '11px' }}>Módulo de notas (USD 10)</p>
                                <p style={{ fontSize: '11px' }}>Módulo de entrenamiento manos propias (USD 15)</p>
                                <p style={{ fontSize: '11px' }}>Manos de entrenaminento manos pre-configuradas (USD 30)</p>
                                <p style={{ fontSize: '11px' }}>Soporte 8x5 (USD 10)</p>
                                <h3 style={{ textDecoration: 'line-through', color: '#ccc' }}>USD 95 / mes</h3>
                                <h3 style={{ color: '#00ECB3' }}>USD 10 / mes</h3>

                                <p style={{ fontSize: '12px' }}>¿Otros medios de pago?, escríbenos a: <a href="mailto:info@pokerstudyapp.com">info@pokerstudyapp.com</a></p>
                                <PayPalScriptProvider options={{ clientId: "ASWXXIbmZawGEP6YVu8McY_Z77H9jZp4qGSeZOLmalIMsZUbkQvB2g2HR-nY7eGa4GJCXaRIlZM6hwKf" }}>
                                    <PayPalButtons
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [
                                                    {
                                                        description: "Modo PRO",
                                                        amount: {
                                                            value: '10'
                                                        }
                                                    }
                                                ]
                                            });
                                        }}
                                        onApprove={async (data, actions) => {
                                            const order = await actions.order?.capture();
                                            console.log("order", order);
                                            onUpgrade('PRO');
                                        }}
                                    />
                                </PayPalScriptProvider>
                            </div>
                        )}
                        <div className="plan-crusher-premium">
                            <h2>Modo PREMIUM</h2>
                            <p style={{ fontSize: '11px' }}>Metodología efectiva de aprendizaje (USD 30)</p>
                            <p style={{ fontSize: '11px' }}>Módulo de notas (USD 10)</p>
                            <p style={{ fontSize: '11px' }}>Módulo de entrenamiento manos propias (USD 15)</p>
                            <p style={{ fontSize: '11px' }}>Manos de entrenaminento manos pre-configuradas (USD 30)</p>
                            <p style={{ fontSize: '11px' }}>Soporte 8x5 (USD 10)</p>
                            <p style={{ fontSize: '11px' }}>Módulo análisis de spots y acciones (USD 30)</p>
                                <p style={{ fontSize: '11px' }}>Aprendizaje Gamificado (Ranking) (USD 10)</p>
                            <h3 style={{ textDecoration: 'line-through', color: '#ccc' }}>USD 135 / mes</h3>
                            <h3 style={{ color: '#00ECB3' }}>USD 25 / mes</h3>
                            <p style={{ fontSize: '12px' }}>Oferta especial por lanzamiento.</p>
                            <p style={{ fontSize: '12px' }}>¿Otros medios de pago?, escríbenos a: <a href="mailto:info@pokerstudyapp.com">info@pokerstudyapp.com</a></p>
                            <PayPalScriptProvider options={{ clientId: "ASWXXIbmZawGEP6YVu8McY_Z77H9jZp4qGSeZOLmalIMsZUbkQvB2g2HR-nY7eGa4GJCXaRIlZM6hwKf" }}>
                                <PayPalButtons
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    description: "Modo PREMIUM",
                                                    amount: {
                                                        value: '25'
                                                    }
                                                }
                                            ]
                                        });
                                    }}
                                    onApprove={async (data, actions) => {
                                        const order = await actions.order?.capture();
                                        console.log("order", order);
                                        onUpgrade('PREMIUM');
                                    }}
                                />
                            </PayPalScriptProvider>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sidebar;


/*
<div className="txtChangeMode">Stake</div>
                    <select
                        id="handStake"
                        value={handStake}
                        onChange={handleStakeChange}
                        className="input Stake"
                    >
                        <option value="" >Cualquiera</option>
                        {pokerStakes.map((stake, index) => (
                            <option key={index} value={stake}>{stake}</option>
                        ))}
                    </select>
                    */
