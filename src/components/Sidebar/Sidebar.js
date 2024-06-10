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
    const { pokerHand, updatePokerHand, resetPokerHand, fetchPokerHandsTrainer,fetchPokerHands } = useContext(PokerHandContext);
    const { user, signOut } = useAuthenticator();

    useEffect(() => {
        if (pokerHand.handTitle) {
            setHandTitle(pokerHand.handTitle);
            setHandStake(pokerHand.stake);
            setDescription(pokerHand.description);
            setIsShareable(pokerHand.share);
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
    };

    const handleHandSourceChange = (e) => {
        setHandSource(e.target.value);
    };

    const toggleMode = () => {
        if (membership === 'BASIC') {
            setShowUpsellModal(true);
        } else {
            setMode((prevMode) => (prevMode === 'Estudio' ? 'Trainer' : 'Estudio'));
            //resetPokerHand();
        }
    };

    const closeModal = () => {
        setShowUpsellModal(false);
        setIsUpgraded(false);
        window.location.reload();
    };

    const handleUpgrade = async () => {
        setIsUpgraded(true);
        const endDate = format(addMonths(new Date(), 3), "yyyy-MM-dd") + "Z";

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
        if(handSource === 'sharedHands')
            fetchPokerHandsTrainer(handStake, handTitle, share);
        else
            fetchPokerHands(user.username,handStake, handTitle, share);
    };

    return (
        <div className="sidebar">
            <div className="mode-switch">
                <h2 className="txtMembershipPlan">Plan: {membership} </h2>
                <span className="txtChangeMode">Cambiar modo </span>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={mode === 'Trainer'}
                        onChange={toggleMode}
                    />
                    <span className="slider round"></span>
                </label>
            </div>
            <div className="mode-label">
                <span>Modo {mode}</span>
            </div>
            {mode === 'Estudio' ? (
                <></>
            ) : (
                <>

                    <div className="txtChangeMode">Elige una fuente de manos</div>
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
            )}
            <div className="txtChangeMode">Elige un spot</div>
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
            <div className="txtChangeMode">Elige un stake</div>
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
                            <label htmlFor="isShareable">¿Se puede compartir?</label>
                        </div>
                    )}
                </>
            ) : (
                <button className="loadHandsButton" onClick={loadHands}>
                    Cargar manos
                </button>
            )}
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
                        <p>Has ganado una membresía PRO por 3 meses.</p>
                    </>
                ) : (
                    <>
                        <h2>Mejora a PRO</h2>
                        <p>Obtén acceso a funciones avanzadas por solo</p> <h3>USD 5 / mes</h3>
                        <button className="upgradeButton" onClick={onUpgrade}>Mejorar ahora</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
