import React, { useState, useEffect, useContext } from 'react';
import { PokerHandContext } from '../PokerHandContext/PokerHandContext';
import './PokerTable.css';

function PokerTable() {
    const { pokerHand, updatePokerHand } = useContext(PokerHandContext);
    const [maxPlayers, setMaxPlayers] = useState(6);
    const [mySeat, setMySeat] = useState(9);
    const [rivalSeat, setRivalSeat] = useState(9);
    const [currentPositions, setCurrentPositions]= useState([]);

    const playerPositions6Max = ['UTG', 'MP', 'CO', 'BU', 'SB', 'BB'];
    const playerPositions9Max = ['UTG', 'MP', 'CO', 'BU', 'SB', 'BB', 'MP2', 'MP3', 'HJ'];


    useEffect(() => {

        setMySeat(pokerHand.heroPosition);
        setRivalSeat(pokerHand.villainPosition);
        setMaxPlayers(pokerHand.tableType);


    }, [pokerHand]);

   useEffect(() => {

        setMySeat(pokerHand.heroPosition);
        setRivalSeat(pokerHand.villainPosition);
        setMaxPlayers(pokerHand.tableType);



       if(maxPlayers.toString()=='9')
            setCurrentPositions(playerPositions9Max);
        else
            setCurrentPositions(playerPositions6Max);

    }, [mySeat,rivalSeat,maxPlayers,setCurrentPositions]);

    const handleSeatClick = (index) => {


        if (index == mySeat) {

            setMySeat(9);
            updatePokerHand('heroPosition', 9);
        } else if (index == rivalSeat) {

            setRivalSeat(9);
            updatePokerHand('villainPosition', 9);
        } else if (mySeat == 9) {

            setMySeat(index);
            updatePokerHand('heroPosition', index);
        } else if (rivalSeat == 9) {

            setRivalSeat(index);
            updatePokerHand('villainPosition', index);
        }
    };

    const getSeatStyle = (index) => {



        if (index == mySeat) {

            return { backgroundColor: '#4CAF50' };
        } else if (index == rivalSeat) {

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
