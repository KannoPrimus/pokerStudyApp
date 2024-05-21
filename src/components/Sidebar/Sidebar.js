import React, { useState, useEffect, useContext } from 'react';
import './Sidebar.css'; // Ensure to have a CSS file with appropriate styles
import { useAuthenticator } from '@aws-amplify/ui-react';
import { PokerHandContext } from '../PokerHandContext/PokerHandContext';

function Sidebar() {
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
    };

    const handleTitleBlur = () => {
        updatePokerHand('handTitle', handTitle);
    };

    return (
        <div className="sidebar">
            <input
                id="handTitle"
                type="text"
                placeholder="Enter a title..."
                value={handTitle}
                onChange={handleTitleChange}
                onBlur={handleTitleBlur}
                className="input"
            />

            <button onClick={signOut}>Salir</button>
        </div>
    );
}

export default Sidebar;
