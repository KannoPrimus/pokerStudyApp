import React, { useState } from 'react';
import './PokerTable.css';

function PokerTable() {
    const [maxPlayers, setMaxPlayers] = useState(6);
    const [mySeat, setMySeat] = useState(null);
    const [rivalSeat, setRivalSeat] = useState(null);

    const playerPositions6Max = ['UTG', 'MP', 'CO', 'BU', 'SB', 'BB'];
    const playerPositions9Max = ['UTG', 'MP', 'CO', 'BU', 'SB', 'BB', 'MP2', 'MP3', 'HJ'];
    const currentPositions = maxPlayers === 6 ? playerPositions6Max : playerPositions9Max;

    const handleSeatClick = (index) => {
        if (index === mySeat) {
            // Desmarcar mi asiento si se vuelve a hacer clic en él
            setMySeat(null);
        } else if (index === rivalSeat) {
            // Desmarcar el asiento del rival si se vuelve a hacer clic en él
            setRivalSeat(null);
        } else if (mySeat === null) {
            // Marcar mi asiento si no se ha seleccionado aún
            setMySeat(index);
        } else if (rivalSeat === null) {
            // Marcar el asiento del rival si no se ha seleccionado aún
            setRivalSeat(index);
        }
    };

    const getSeatStyle = (index) => {
        if (index === mySeat) {
            return { backgroundColor: '#4CAF50' }; // Verde para el jugador
        } else if (index === rivalSeat) {
            return { backgroundColor: '#FF5722' }; // Rojo para el rival
        }
        return {};
    };

    return (
        <div className="poker-table-container">
            <div className="poker-table">
                {currentPositions.map((position, index) => (
                    <div key={index} className={`player-seat player-seat-${index}`} style={getSeatStyle(index)} onClick={() => handleSeatClick(index)}>
                        {position}
                    </div>
                ))}
                <div className="table-center">
                    <select value={maxPlayers} onChange={e => setMaxPlayers(Number(e.target.value))} className="player-count-selector">
                        <option value={6}>6-Max</option>
                        <option value={9}>9-Max</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default PokerTable;
