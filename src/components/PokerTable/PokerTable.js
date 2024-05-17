import React, { useState, useEffect, useContext } from 'react';
import { PokerHandContext } from '../PokerHandContext/PokerHandContext';
import './PokerTable.css';

function PokerTable() {
    const [maxPlayers, setMaxPlayers] = useState(6);
    const [mySeat, setMySeat] = useState(null);
    const [rivalSeat, setRivalSeat] = useState(null);
    const { pokerHand, updatePokerHand } = useContext(PokerHandContext);

    const playerPositions6Max = ['UTG', 'MP', 'CO', 'BU', 'SB', 'BB'];
    const playerPositions9Max = ['UTG', 'MP', 'CO', 'BU', 'SB', 'BB', 'MP2', 'MP3', 'HJ'];
    const currentPositions = maxPlayers === 6 ? playerPositions6Max : playerPositions9Max;

    useEffect(() => {
        updatePokerHand('heroPosition', mySeat);
        updatePokerHand('villainPosition', rivalSeat);
        updatePokerHand('tableType', maxPlayers);
    }, [mySeat, rivalSeat, maxPlayers]);

    const handleSeatClick = (index) => {
        if (index === mySeat) {
            setMySeat(null);
            updatePokerHand('heroPosition', null);
        } else if (index === rivalSeat) {
            setRivalSeat(null);
            updatePokerHand('villainPosition', null);
        } else if (mySeat === null) {
            setMySeat(index);
            updatePokerHand('heroPosition', index);
        } else if (rivalSeat === null) {
            setRivalSeat(index);
            updatePokerHand('villainPosition', index);
        }
    };

    const getSeatStyle = (index) => {
        if (index === mySeat) {
            return { backgroundColor: '#4CAF50' };
        } else if (index === rivalSeat) {
            return { backgroundColor: '#FF5722' };
        }
        return {};
    };

    const handleTableTypeChange = (event) => {
        const newMaxPlayers = parseInt(event.target.value, 10);
        setMaxPlayers(newMaxPlayers);
        updatePokerHand('tableType', newMaxPlayers);
    };

    return (
        <div className="poker-table-container">
            <div className="poker-table">
                {currentPositions.map((position, index) => (
                    <div
                        key={index}
                        className={`player-seat player-seat-${index}`}
                        style={getSeatStyle(index)}
                        onClick={() => handleSeatClick(index)}
                    >
                        {position}
                    </div>
                ))}
                <div className="table-center">
                    <div className="legend">
                        <div className="legend-item">
                            <span className="legend-color" style={{ backgroundColor: '#4CAF50' }}></span>
                            <span>Hero</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-color" style={{ backgroundColor: '#FF5722' }}></span>
                            <span>Villain</span>
                        </div>
                    </div>
                    <select value={maxPlayers} onChange={handleTableTypeChange} className="player-count-selector">
                        <option value={6}>6-Max</option>
                        <option value={9}>9-Max</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default PokerTable;
