import React, { useState, useEffect, useContext } from 'react';
import './Sidebar.css'; // Ensure to have a CSS file with appropriate styles
import { useAuthenticator } from '@aws-amplify/ui-react';
import { PokerHandContext } from '../PokerHandContext/PokerHandContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the necessary CSS styles
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

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

function Sidebar({mode, setMode, sequence, setSequence}) {
    const [handTitle, setTitle] = useState('');
    const { pokerHand, updatePokerHand } = useContext(PokerHandContext);
    const { signOut } = useAuthenticator();

    useEffect(() => {
        setTitle(pokerHand.handTitle);
    }, [pokerHand]);

    useEffect(() => {
        updatePokerHand('handTitle', handTitle);
    }, [handTitle]);

    const handleTitleChange = e => {
        setTitle(e.target.value);
        setSequence(e.target.value);

    };

    const handleTitleBlur = () => {
        updatePokerHand('handTitle', handTitle);
    };
    const toggleMode = () => {
        setMode(prevMode => (prevMode === 'Estudio' ? 'Trainer' : 'Estudio'));
        setSequence('');
    };

    return (
        <div className="sidebar">
            <div className="mode-switch">
                <span className="txtChangeMode" >Cambiar modo </span>
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
            ) : (<div className="txtChangeMode">Elige una secuencia</div>)}
            <select
                id="handTitle"
                value={handTitle}
                onChange={handleTitleChange}
                className="input"
            >
                <option value="" disabled>Secuencia</option>
                {pokerSequences.map((sequence, index) => (
                    <option key={index} value={sequence}>
                        {sequence}
                    </option>
                ))}
            </select>

            <button className="logOutButton" onClick={signOut}> <FontAwesomeIcon icon="door-open" /> Salir</button>
        </div>
    );
}

export default Sidebar;
