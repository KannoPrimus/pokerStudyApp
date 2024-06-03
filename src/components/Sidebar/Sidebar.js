import React, { useState, useEffect, useContext } from 'react';
import './Sidebar.css'; // Ensure to have a CSS file with appropriate styles
import { useAuthenticator } from '@aws-amplify/ui-react';
import { PokerHandContext } from '../PokerHandContext/PokerHandContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the necessary CSS styles
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {createMembers, updateMembers} from "../../graphql/mutations";
import { generateClient } from "aws-amplify/api";
import { addMonths, format ,parseISO, isBefore} from 'date-fns';

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

library.add(fas);

function Sidebar({ mode, setMode, sequence, setSequence, membership }) {
    const [handTitle, setTitle] = useState('');
    const [showUpsellModal, setShowUpsellModal] = useState(false);
    const [isUpgraded, setIsUpgraded] = useState(false);
    const { pokerHand, updatePokerHand } = useContext(PokerHandContext);
    const { user, signOut } = useAuthenticator();


    useEffect(() => {
        setTitle(pokerHand.handTitle);
    }, [pokerHand]);

    useEffect(() => {
        updatePokerHand('handTitle', handTitle);
    }, [handTitle]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setSequence(e.target.value);
    };

    const handleTitleBlur = () => {
        updatePokerHand('handTitle', handTitle);
    };

    const toggleMode = () => {
        if (membership === 'BASIC') {
            setShowUpsellModal(true);
        } else {
            setMode((prevMode) => (prevMode === 'Estudio' ? 'Trainer' : 'Estudio'));
            setSequence('');

        }
    };

    const closeModal = () => {
        setShowUpsellModal(false);
        setIsUpgraded(false); // Reset the upgrade state
        window.location.reload();
    };

    const handleUpgrade = () => {
        setIsUpgraded(true);

        const endDate = format(addMonths(new Date(), 3), "yyyy-MM-dd") + "Z";

        try {
            const updateMembership = async (playerId) => {
                const newMembers = await client.graphql({
                    query: updateMembers,
                    variables: {
                        input: {
                            "id": playerId,
                            "playerId": playerId,
                            "memberPlan": "PRO",
                            "endDate": endDate
                        }
                    }
                });
            };

            updateMembership(user.username);
        }
        catch{
            console.log('Error updating');
        }
    };

    return (
        <div className="sidebar">
            <div className="mode-switch">
                <h2 className="txtMembershiPlan">Plan: {membership} </h2>
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
            <span className="mode-label">Modo {mode}</span>
            {mode === 'Estudio' ? (
                <div className="txtChangeMode">Clasifica tu mano</div>
            ) : (
                <div className="txtChangeMode">Elige una secuencia</div>
            )}
            <select
                id="handTitle"
                value={handTitle}
                onChange={handleTitleChange}
                className="input"
            >
                <option value="" disabled>
                    Secuencia
                </option>
                {pokerSequences.map((sequence, index) => (
                    <option key={index} value={sequence}>
                        {sequence}
                    </option>
                ))}
            </select>
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
                        <FontAwesomeIcon icon="gift" size="3x"/>
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
