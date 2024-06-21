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

function Sidebar({ mode, setMode, sequence, setSequence, membership, stake, setStake }) {
    const [handTitle, setHandTitle] = useState('');
    const [handStake, setHandStake] = useState('');
    const [description, setDescription] = useState('');
    const [isShareable, setIsShareable] = useState(false);
    const [showUpsellModal, setShowUpsellModal] = useState(false);
    const [isUpgraded, setIsUpgraded] = useState(false);
    const [handSource, setHandSource] = useState('playerHands');
    const { pokerHand, updatePokerHand, resetPokerHand, fetchPokerHandsTrainer, fetchPokerHands } = useContext(PokerHandContext);
    const { user, signOut } = useAuthenticator();

    useEffect(() => {
        if (pokerHand.handTitle) {
            setHandTitle(pokerHand.handTitle);
            setHandStake(pokerHand.stake);
            setDescription(pokerHand.description);
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

    const handleTitleChange = (e) => {
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
        if (selectedSource === 'sharedHands' && membership === 'BASIC') {
            setShowUpsellModal(true);
        } else {
            setHandSource(selectedSource);
        }
    };

    const changeMode = (newMode) => {
        if (newMode !== mode) {
            if ((newMode === 'Trainer' || newMode === 'Estadisticas') && membership === 'BASIC') {
                setShowUpsellModal(true);
            } else {
                setMode(newMode);
                resetPokerHand();
            }
        }
    };

    const closeModal = () => {
        setShowUpsellModal(false);
        setIsUpgraded(false);
        window.location.reload();
    };

    const handleUpgrade = async () => {
        setIsUpgraded(true);
        const endDate = format(addMonths(new Date(), 1), "yyyy-MM-dd") + "Z";

        try {
            await client.graphql({
                query: updateMembers,
                variables: {
                    input: {
                        "id": user.username,
                        "playerId": user.username,
                        "memberPlan": "PRO",
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
            fetchPokerHands(user.username, handStake, handTitle, share);
    };

    return (
        <div className="sidebar">
            <div className="mode-switch">
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
                <div className="txtMembershiPlan">Descripción de la mano:</div>
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
            <div className="txtChangeMode">Stake</div>
            <select
                id="handStake"
                value={handStake}
                onChange={handleStakeChange}
                className="input"
            >
                <option value="" disabled>Stake</option>
                {pokerStakes.map((stake, index) => (
                    <option key={index} value={stake}>{stake}</option>
                ))}
            </select>
            <div className="txtChangeMode">Spot</div>
            <select
                id="handTitle"
                value={handTitle}
                onChange={handleTitleChange}
                className="input"
            >
                <option value="" disabled>Secuencia</option>
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
                    <textarea
                        id="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Escribe una descripción..."
                        rows="4"
                        className="input"
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
                <button className="loadHandsButton" onClick={loadHands}>
                    Cargar manos
                </button>
            ) : null}
            <button className="logOutButton" onClick={signOut}>
                <FontAwesomeIcon icon="door-open" /> Salir
            </button>
            {showUpsellModal && (
                <UpsellModal onClose={closeModal} onUpgrade={handleUpgrade} isUpgraded={isUpgraded} />
            )}
        </div>
    );
}

function UpsellModal({ onClose, onUpgrade, isUpgraded }) {
    return (
        <div className="modalUpsell">
            <div className="modalUpsell-content">
                <span className="closeUpsell" onClick={onClose}>
                    &times;
                </span>
                {isUpgraded ? (
                    <>
                        <h2>¡Felicidades!</h2>
                        <FontAwesomeIcon icon="gift" size="3x" />
                        <p>Has ganado una membresía PRO por 1 mes.</p>
                    </>
                ) : (
                    <>
                        <h2>Modo PRO</h2>
                        <p>Obtén acceso a funciones avanzadas por solo</p> <h3>USD 49 / mes</h3>
                        <button className="upgradeButton" onClick={onUpgrade}>Comprar</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
