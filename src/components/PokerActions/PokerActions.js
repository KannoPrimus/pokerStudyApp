import React, { useState, useEffect, useContext } from 'react';
import './PokerActions.css';
import { PokerHandContext } from '../PokerHandContext/PokerHandContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const actionOptions = [
    "OR 2.5bb", "OR 3bb", "BET 25%", "BET 33%", "BET 50%", "BET 66%", "BET 75%", "BET 100%",
    "OVERBET 125%", "OVERBET 150%", "OVERBET 200%", "ALL-IN", "DONK", "RAISE", "CHECK", "CHECK-CALL",
    "CHECK-RAISE", "CHECK-FOLD", "CHECK BEHIND", "CALL", "CALL vs 33%", "CALL vs 50%", "CALL vs 75%", "CALL vs 100%",
    "CALL vs OVERBET", "FOLD", "FOLD vs 33%", "FOLD vs 50%", "FOLD vs 75%", "FOLD vs 100%", "FOLD vs OVERBET", "RAISE",
    "RAISE/FOLD", "RAISE/CALL", "RAISE/RAISE"
];

const playerOptions = ["Hero", "Villain"];

function PokerActions({ id }) {
    const { pokerHand, updatePokerHand } = useContext(PokerHandContext);
    const [selectedPlayer, setSelectedPlayer] = useState('');
    const [selectedAction, setSelectedAction] = useState('');
    const [actions, setActions] = useState([]);

    useEffect(() => {
        const phase = id.toLowerCase();

        if(pokerHand[`${phase}Action`]=="{}")
            setActions([]);
        else {

            if(typeof pokerHand[`${phase}Action`] == "string"){
                console.log(phase);
                console.log(pokerHand[`${phase}Action`]);
                const jsonString = pokerHand[`${phase}Action`]

                    .replace(/(\w+)=/g, '"$1":')
                    .replace(/ /g,"_")
                    .replace(/,_/g,",")
                    .replace(/:"([^"]+?)"/g, (_, value) => {
                        // Añadir comillas a los valores de cadena, y mantener booleanos y números sin comillas
                        if (value === 'true' || value === 'false' || !isNaN(value)) {
                            return `:${value}`;
                        }
                        return `:"${value}"`;
                    })
                    .replace(/:([^",{}\s]+)([,}])/g, ':\"$1\"$2');


                // Añadir corchetes a los valores que no sean booleanos ni números
                const cleanedJsonString = jsonString
                   .replace(/:"(\w+ [^,{}]+)"/g, ':\"$1\"');

                console.log(cleanedJsonString);

                const array = JSON.parse(jsonString);

                console.log('Array:');
                console.log(array);

                try{
                    setActions(array);
                    console.log('Actions:');
                    console.log( actions);
                }catch{
                    console.log( "empty object");
                }

            }else
                setActions(pokerHand[`${phase}Action`]);
        }


    }, [pokerHand, id]);

    const handleAddAction = () => {
        if (selectedPlayer && selectedAction) {
            const newAction = {
                player: selectedPlayer,
                action: selectedAction,
                order: (actions.length + 1),
                street: id,
                isCorrect: false,
                isOptional: false
            };
            const newActions = [...actions, newAction];
            setActions(newActions);
            updatePokerHand(`${id.toLowerCase()}Action`, newActions);
            setSelectedAction('');
            setSelectedPlayer('');
        }
    };

    const handleRemoveAction = (index) => {

        const newActions = actions.filter((_, i) => i !== index);
        setActions(newActions);
        updatePokerHand(`${id.toLowerCase()}Action`, newActions);
    };

    const handleToggleCorrect = (index) => {

        console.log(typeof index);
        console.log( index);

        const newActions = actions.map((action, i) => {

            console.log(action.player);

            if (i === index && action.player === 'Hero') {

                console.log(action.isCorrect);
                if(action.isCorrect==='true')
                    return { ...action, isCorrect: 'false' };
                else
                    return { ...action, isCorrect: 'true' };
            }
            return action;
        });
        setActions(newActions);
        updatePokerHand(`${id.toLowerCase()}Action`, newActions);
    };

    const handleToggleOptional = (index) => {
        const newActions = actions.map((action, i) => {
            if (i === index && action.player === 'Hero') {
                if(action.isOptional==='true')
                    return { ...action, isOptional: 'false' };
                else
                    return { ...action, isOptional: 'true' };
            }
            return action;
        });
        setActions(newActions);
        updatePokerHand(`${id.toLowerCase()}Action`, newActions);
    };

    return (
        <div className="poker-actions-container">
           Secuencia {id}
            <div className="add-action">
                <select value={selectedPlayer} onChange={(e) => setSelectedPlayer(e.target.value)} className="modern-scrollbar">
                    <option value="">Select Player</option>
                    {playerOptions.map((player, index) => (
                        <option key={index} value={player}>{player}</option>
                    ))}
                </select>
                <select value={selectedAction} onChange={(e) => setSelectedAction(e.target.value)} className="modern-scrollbar">
                    <option value="">Select Action</option>
                    {actionOptions.map((action, index) => (
                        <option key={index} value={action}>{action}</option>
                    ))}
                </select>
                <button onClick={handleAddAction}>+</button>
            </div>
            <div className="actions-list">
                {actions.map((action, index) => (
                    <div key={index} className={`tag ${action.isCorrect ==='true' ? 'correct-action' : ''} ${action.isOptional ==='true' ? 'optional-action' : ''}`}>
                        {action.order}. {action.player}: {action.action}

                        {action.player === 'Hero' && (
                            <>
                                <button onClick={() => handleToggleCorrect(Number(index))} className="mark-correct-button">
                                    {action.isCorrect ==='true' ? '✓' : 'Mark Correct'}
                                </button>
                                <button onClick={() => handleToggleOptional(Number(index))} className="mark-optional-button">
                                    {action.isOptional === 'true' ? 'Op' : 'Mark Optional'}
                                </button>
                            </>

                        )}
                        <button onClick={() => handleRemoveAction(Number(index))} className="remove-tag-button">x</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PokerActions;
