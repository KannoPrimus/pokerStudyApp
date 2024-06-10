import React, { useState, useEffect, useContext } from 'react';
import { PokerHandContext } from '../PokerHandContext/PokerHandContext';
import { useAuthenticator } from '@aws-amplify/ui-react';
import CardSelector  from '../CardSelector/CardSelector';
import './PokerTrainer.css';

const preflopFirstActions = ["OR_2.5bb", "OR_3bb", "ALL-IN"];
const postflopFirstActions = ["CHECK", "BET_33%", "BET_50%", "BET_75%", "BET_125%"];

const vsAggressiveActions = ["FOLD", "CALL", "RAISE_x3", "RAISE_x5", "ALL-IN"];
const vsPassiveActions = ["CHECK", "BET_33%", "BET_50%", "BET_75%", "BET_125%"];

function PokerTrainer({sequence , stake, membership}) {
    const { signOut, user } = useAuthenticator();
    const { pokerHand, setPokerHand , pokerHandList, fetchPokerHandsTrainer , resetPokerHand, resetPokerHandList  } = useContext(PokerHandContext);
    const [filteredHands, setFilteredHands] = useState([]);
    const [maxPlayers, setMaxPlayers] = useState(6);
    const [mySeat, setMySeat] = useState(9);
    const [rivalSeat, setRivalSeat] = useState(9);
    const [currentPositions, setCurrentPositions]= useState([]);
    const [currentHand, setCurrentHand] = useState(null);
    const [currentHandIndex, setCurrentHandIndex] = useState(0);
    const [actions, setActions] = useState([]);  // Nuevo estado para las acciones
    const [streetName, setStreetName] = useState('preflop'); // Calle específica para las acciones
    const [responses, setResponses] = useState({});  // Estado para registrar las respuestas
    const playerPositions6Max = ['SB', 'BB','UTG', 'MP', 'CO', 'BU'];
    const playerPositions9Max = ['UTG', 'MP', 'CO', 'BU', 'SB', 'BB', 'MP2', 'MP3', 'HJ'];
    const [finishHand,setFinishHand] =useState('false');
    const [actionIndex, setActionIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState('');
    const [score, setScore] = useState(0);
    const [totalActions, setTotalActions] = useState(0);
    const [chips, setChips] = useState([]); // Nuevo estado para las fichas
    const [firstPlayer, setFirstPlayer] = useState('');

    useEffect(() => {
        resetPokerHand();

    }, []);


    useEffect(() => {



        const filtered = pokerHandList;//.filter(hand => (hand.share.toLowerCase().includes('true')));

        setFilteredHands(filtered);
        setStreetName('preflop');
        resetPokerHand();
        setActionIndex(0);
        setFinishHand('false');
        setScore(0); // Reset score for the new hand
        setTotalActions(0); // Reset score for the new hand
        setChips([]); // Reset chips when new sequence is loaded

        if (filtered.length > 0) {

            setActions([]);
            setCurrentHand(filtered[0]);
            setCurrentHandIndex(0);
            setMySeat('');
            setRivalSeat('');


        } else {


            if(sequence!=='' || stake!=='') {
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                }, 3000);
            }
    }


    }, [pokerHandList]);


    useEffect(() => {

        if (currentHand) {

            setMySeat(currentHand.heroPosition);
            setRivalSeat(currentHand.villainPosition);
            setMaxPlayers(currentHand.tableType);
            setPokerHand(currentHand);
            setActionIndex(0);


            if(currentHand[`${streetName}Action`]=="{}")
                setActions([]);
            else {

                if(typeof currentHand[`${streetName}Action`] == "string"){

                    const jsonString = currentHand[`${streetName}Action`]

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

                    const array = JSON.parse(jsonString);



                    try{
                        setActions(array);
                        setCurrentPlayer(array[0].player)

                    }catch{
                        console.log( "empty object");
                    }

                }else
                    setActions(currentHand[`${streetName}Action`]);
            }


        }
    }, [currentHand,streetName]);

    useEffect(() => {

        if (currentHand) {
            setMySeat(currentHand.heroPosition);
            setRivalSeat(currentHand.villainPosition);
            setMaxPlayers(currentHand.tableType);
            setPokerHand(currentHand);

        }

    }, [pokerHand,streetName]);

    useEffect(() => {

        if (currentHand) {
            setMySeat(currentHand.heroPosition);
            setRivalSeat(currentHand.villainPosition);
            setMaxPlayers(currentHand.tableType);
            setPokerHand(currentHand);

        }

        if(maxPlayers.toString()=='9')
            setCurrentPositions(playerPositions9Max);
        else
            setCurrentPositions(playerPositions6Max);

    }, [mySeat,rivalSeat,maxPlayers,setCurrentPositions,streetName]);


    const getSeatStyle = (index) => {
        let style = {};

        if (index == mySeat) {
            style.backgroundColor = '#4CAF50';
        } else if (index == rivalSeat) {
            style.backgroundColor = '#FF5722';
        }

        if (index == mySeat && currentPlayer == 'Hero') {
            style = { ...style, animation: 'glow 1s infinite' };
        } else if (index == rivalSeat && currentPlayer == 'Villain') {
            style = { ...style, animation: 'glow 1s infinite' };
        }

        return style;
    };

    const handleNextHand = () => {
        setMySeat('');
        setRivalSeat('');
        if (currentHandIndex < filteredHands.length - 1) {
            const nextIndex = currentHandIndex + 1;
            setCurrentHand(filteredHands[nextIndex]);
            setCurrentHandIndex(nextIndex);
            setStreetName('preflop');
            setResponses({}); // Reiniciar respuestas
            setFinishHand('false');
            setScore(0); // Reset score for the new hand
            setTotalActions(0); // Reset score for the new hand
            setChips([]); // Reset chips when new sequence is loaded
        }

    };

    const handlePreviousHand = () => {
        setMySeat('');
        setRivalSeat('');
        if (currentHandIndex > 0) {
            const prevIndex = currentHandIndex - 1;
            setCurrentHand(filteredHands[prevIndex]);
            setCurrentHandIndex(prevIndex);
            setStreetName('preflop');
            setResponses({}); // Reiniciar respuestas
            setFinishHand('false');
            setScore(0); // Reset score for the new hand
            setTotalActions(0); // Reset score for the new hand
            setChips([]); // Reset chips when new sequence is loaded
        }
    };




    const getCurrentButtons = (actions, currentIndex) => {
        if (!actions || actions.length === 0 || currentIndex >= actions.length) {
            return [];
        }

        console.log(actions);
        const currentPlayer = actions[currentIndex].player;
        const currentButtons = [];

        for (let i = currentIndex; i < actions.length; i++) {
            if (actions[i].player === currentPlayer) {
                currentButtons.push(actions[i]);
            } else {
                break;
            }
        }

        let referenceActions = [];

        // Determine which array to use based on the current street and action
        if (streetName === 'preflop') {
            referenceActions = preflopFirstActions;
        } else if (vsAggressiveActions.includes(currentAction.action)) {
            referenceActions = vsAggressiveActions;
        } else if (vsPassiveActions.includes(currentAction.action)) {
            referenceActions = vsPassiveActions;
        }

        if (currentPlayer === 'Hero') {

            for (let i = 0; i < referenceActions.length; i++) {


                if(referenceActions[i]!==currentButtons[0].action) {

                    let newButton = {
                        player: 'Hero',
                        action: referenceActions[i],
                        order: (i + 2),
                        street: streetName,
                        isCorrect: false,
                        isOptional: false
                    };
                    currentButtons.push(newButton);
                }
            }
        }

        console.log(currentButtons);
        return currentButtons.sort(() => Math.random() - 0.5);
    };



    const handleActionClick = (action) => {

        if(currentPlayer==='Hero') {

            setResponses(prevResponses => ({
                ...prevResponses,
                [streetName]: [...(prevResponses[streetName] || []), action]
            }));

            setTotalActions(prevTotalActions => prevTotalActions + 1);

            console.log(action);

            // Update the score
            if (action.isCorrect === 'true') {
                setScore(prevScore => prevScore + 1);
            }
        }

        if (action.action.includes('FOLD')) {
            setFinishHand('true');
        }

        // Add chips for BET, RAISE, or ALL-IN actions
        if (['BET', 'RAISE', 'ALL-IN','OR','CALL'].some(keyword => action.action.includes(keyword))) {
            setChips(prevChips => [...prevChips, action.action]);
        }

        const nextActionIndex = actions.findIndex((act, idx) => act.player !== currentPlayer && idx > actionIndex);
        if (nextActionIndex !== -1) {

            setActionIndex(nextActionIndex);
            setCurrentPlayer(actions[nextActionIndex].player);

            if(actions[nextActionIndex].action.search('FOLD')>-1)
                setFinishHand('true');

        } else {

            if (streetName === 'preflop') {
                    setStreetName('flop');
            } else if (streetName === 'flop') {
                    setStreetName('turn');
            } else if (streetName === 'turn') {
                    setStreetName('river');
            } else if (streetName === 'river') {
                setFinishHand('true');
            }
            setActionIndex(0);
            setCurrentPlayer('');

        }
    };


    const currentAction = actions[actionIndex] || null;
    const currentButtons = getCurrentButtons(actions, actionIndex);


    const isCorrectResponse = (response, street) => {
        return response.isCorrect === 'true' && response.street.toLowerCase() === street;
    };

    const getScoreColor = (percentage) => {
        const hue = (percentage * 1.2).toString(10); // Scale percentage to hue value (0-120)
        return `hsl(${hue}, 100%, 50%)`; // Convert hue to HSL color
    };

    const scorePercentage = Math.round((score / totalActions) * 100) || 0;
    const scoreColor = getScoreColor(scorePercentage);



    return (
        <div className="poker-trainer-container-wrapper">
        <div className="poker-trainer-container">
            <div className="trainer-controls-1">
                <button onClick={handlePreviousHand} disabled={currentHandIndex === 0}>Mano Anterior</button>
                <button onClick={handleNextHand} disabled={currentHandIndex === filteredHands.length-1}>Mano Siguiente</button>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>No se encontraron manos para entrenar en la secuencia {sequence}.</p>
                    </div>
                </div>
            )}
            <div className="trainer-poker-table">
                <div className="trainer-poker-table-inner">
                {currentPositions.map((position, index) => (
                    <div
                        key={index}
                        className={`trainer-player-seat trainer-player-seat-${index}`}
                        style={getSeatStyle(index)}
                    >
                        <div className="trainer-seat-text">{position}</div>
                        {index == mySeat && currentHand ? (
                            <div className="trainer-board-cards-hero">
                                <CardSelector card="myHand_1" trainer="true"/>
                                <CardSelector card="myHand_2"  trainer="true"/>
                            </div>
                        ) : index == rivalSeat && currentHand ? (
                            <div className="trainer-board-cards-hero">
                                <CardSelector card="trainerCard"  trainer="true"/>
                                <CardSelector card="trainerCard"  trainer="true"/>
                            </div>
                        ) : (
                            <div className="trainer-board-cards-hidden">
                                {
                                    /* Esconder las cartas de los demás jugadores */}
                            </div>
                        )}
                    </div>
                ))}
                <div className="trainer-table-center">
                    <div className="board-cards section ">
                        {/* Renderizar CardSelectors basado en el streetName */}
                        {(streetName === 'flop' || streetName === 'turn' || streetName === 'river') && (
                            <>
                                <CardSelector card="flopCards_1" trainer="true"/>
                                <CardSelector card="flopCards_2" trainer="true"/>
                                <CardSelector card="flopCards_3" trainer="true"/>
                            </>
                        )}
                        {(streetName === 'turn' || streetName === 'river') && <CardSelector card="turnCard" trainer="true"/>}
                        {streetName === 'river' && <CardSelector card="riverCard" trainer="true"/>}
                    </div>
                    <div className="chips-container">

                        {chips.map((chip, index) => (
                            <div key={index} className="chip">
                            </div>
                        ))}

                    </div>
                    <div className="trainer-legend">
                        <div className="trainer-legend-item">
                            <span className="trainer-legend-color" style={{ backgroundColor: '#4CAF50' }}></span>
                            <span>Hero</span>
                        </div>
                        <div className="trainer-legend-item">
                            <span className="trainer-legend-color" style={{ backgroundColor: '#FF5722' }}></span>
                            <span>Villain</span>
                        </div>
                    </div>


                </div>
            </div>
            </div>
            <div className="trainer-controls-2">
                {(currentAction && finishHand === 'false' && currentPlayer === 'Hero') && (
                    <p className="heroAction">Qué haces?</p>
                )}
                {(finishHand === 'false' && currentAction) && (
                    currentButtons.map((action, index) => (
                        currentPlayer === 'Hero' ? (
                            <button key={index} onClick={() => handleActionClick(action)}>
                                {action.action.replace(/_/g, ' ')}
                            </button>
                        ) : (
                            <React.Fragment key={index}>
                                <p className="villainAction">Villano hizo {action.action.replace(/_/g, ' ')}</p>
                                <button onClick={() => handleActionClick(action)}>
                                    Ok
                                </button>
                            </React.Fragment>
                        )
                    ))
                )}
            </div>


        </div>
            <div className="trainer-responses">
                <h3>Respuestas</h3>
                {Object.keys(responses).map(street => (
                    <div key={street}>
                        <h4>{street}</h4>
                        {responses[street].map((response, index) => (
                            <p
                                key={index}
                                style={{ color: isCorrectResponse(response, street) ? 'green' : 'red' }}
                            >
                                {response.action.replace(/_/g, ' ')}
                            </p>
                        ))}
                    </div>
                ))}
                {finishHand === 'true' && (
                    <div className="score" style={{ color: scoreColor }}>
                        <h3>Puntuación:</h3> {scorePercentage}% ({score}/{totalActions} acciones correctas)
                    </div>
                )}
            </div>

        </div>
    );
}

export default PokerTrainer;

