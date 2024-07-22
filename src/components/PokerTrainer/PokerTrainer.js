import React, { useState, useEffect, useContext } from 'react';
import { PokerHandContext } from '../PokerHandContext/PokerHandContext';
import { useAuthenticator,Text } from '@aws-amplify/ui-react';
import CardSelector from '../CardSelector/CardSelector';
import './PokerTrainer.css';
import { createTrainings } from "../../graphql/mutations";
import {listHands as listHandsQuery, listTrainings} from "../../graphql/queries";
import { generateClient } from "aws-amplify/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

const preflopFirstActions = ["OR_2.5bb", "OR_3bb", "ALL-IN"];
const postflopFirstActions = ["CHECK", "BET_10%", "BET_25%", "BET_33%", "BET_50%", "BET_60%", "BET_75%", "BET_100%", "BET_125%"];

const vsAggressiveActions = ["FOLD", "CALL", "RAISE_x3", "RAISE_x5", "ALL-IN"];
const vsPassiveActions = ["CHECK", "BET_10%", "BET_25%", "BET_33%", "BET_50%", "BET_60%", "BET_75%", "BET_100%", "BET_125%"];

const client = generateClient();

function PokerTrainer({ sequence, stake, membership }) {
    const { signOut, user } = useAuthenticator();
    const { pokerHand, setPokerHand, pokerHandList, fetchPokerHandsTrainer, resetPokerHand, resetPokerHandList } = useContext(PokerHandContext);
    const [filteredHands, setFilteredHands] = useState([]);
    const [maxPlayers, setMaxPlayers] = useState(6);
    const [mySeat, setMySeat] = useState(9);
    const [rivalSeat, setRivalSeat] = useState(9);
    const [currentPositions, setCurrentPositions] = useState([]);
    const [currentHand, setCurrentHand] = useState(null);
    const [currentHandIndex, setCurrentHandIndex] = useState(0);
    const [actions, setActions] = useState([]);
    const [streetName, setStreetName] = useState('preflop');
    const [responses, setResponses] = useState({});
    const playerPositions6Max = ['SB', 'BB', 'UTG', 'MP', 'CO', 'BU'];
    const playerPositions9Max = ['UTG', 'MP', 'CO', 'BU', 'SB', 'BB', 'MP2', 'MP3', 'HJ'];
    const [finishHand, setFinishHand] = useState('false');
    const [actionIndex, setActionIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState('');
    const [score, setScore] = useState(0);
    const [totalActions, setTotalActions] = useState(0);
    const [chips, setChips] = useState([]);
    const [chipsVil, setChipsVil] = useState([]);
    const [trainedHands, setTrainedHands] = useState([]);
    const [streakHands, setStreakHands] = useState([]);
    const [pot, setPot] = useState(1.5);
    const [bet, setBet] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState('');

    useEffect(() => {
        resetPokerHand();


    }, []);

    useEffect(() => {
        let timer;
        if ((currentPlayer !== 'Hero' && currentPlayer !== '') && finishHand === 'false' ) {

            console.log(currentPlayer);

            timer = setTimeout(() => {
                const okButton = document.querySelector('.villainAction + button');
                if (okButton) {
                    okButton.click();
                }
                //handleActionClick(currentAction)
            }, 2000); // 3 segundos, puedes ajustar este valor según tus necesidades
        }
        return () => clearTimeout(timer); // Limpia el timeout al desmontar el componente o cambiar las dependencias
    }, [currentPlayer, finishHand]);

    useEffect(() => {

        if(finishHand==='true'){

            try {

                const createTraining = async (handId, playerId, score) => {
                    const newTraining = await client.graphql({
                        query: createTrainings,
                        variables: {
                            input: {
                                "handId": handId,
                                "playerId": playerId,
                                "score": score,
                                }
                        }
                    });
                };

                //console.log('Save training',currentHand.id + ' ' + user.username+ ' ' + scorePercentage);
                createTraining(currentHand.id ,user.username, scorePercentage);



            } catch (error) {
                console.error('Error saving Training:', error);
            }

            try {

                const fetchTrainingStats = async (playerId=null) => {
                    try {
                        const filter = {  };

                        if (playerId) {
                            filter.playerId = { eq: playerId };
                        }


                        const result = await client.graphql({
                            query: listTrainings,
                            variables: { filter }
                        });

                        setTrainedHands ( result.data.listTrainings.items);

                    } catch (error) {
                        console.log(error);
                    }
                };

                fetchTrainingStats(user.username);

                const getScoreStreak = (hands) => {

                    const sortedHands = hands.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

                    let streak = [];
                    for (let i = sortedHands.length - 1; i >= 0; i--) {
                        if (sortedHands[i].score === 100) {

                            streak.unshift(sortedHands[i]);
                        } else {
                            break;
                        }
                    }
                    return streak;
                };

                setStreakHands (getScoreStreak(trainedHands));


            } catch (error) {
                console.error('Error saving Training:', error);
            }



        }

    }, [finishHand]);

    useEffect(() => {
        const filtered = pokerHandList.sort(() => Math.random() - 0.5);
        setFilteredHands(filtered);
        setStreetName('preflop');
        resetPokerHand();
        setActionIndex(0);
        setFinishHand('false');
        setScore(0);
        setTotalActions(0);
        setChips([]);
        setChipsVil([]);
        setResponses({});
        setPot(1.5);

        if (filtered.length > 0) {
            setActions([]);
            setCurrentHand(filtered[0]);
            setCurrentHandIndex(0);
            setMySeat('');
            setRivalSeat('');



        } else {
            if (sequence !== '' || stake !== '') {
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

            try {

                const fetchTrainingStats = async (playerId=null) => {
                    try {
                        const filter = {  };

                        if (playerId) {
                            filter.playerId = { eq: playerId };
                        }


                        const result = await client.graphql({
                            query: listTrainings,
                            variables: { filter }
                        });

                        setTrainedHands ( result.data.listTrainings.items);

                    } catch (error) {
                        console.log(error);
                    }
                };

                fetchTrainingStats(user.username);

                const getScoreStreak = (hands) => {

                    const sortedHands = hands.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

                    let streak = [];
                    for (let i = sortedHands.length - 1; i >= 0; i--) {
                        if (sortedHands[i].score === 100) {

                            streak.unshift(sortedHands[i]);
                        } else {
                            break;
                        }
                    }
                    return streak;
                };

                setStreakHands (getScoreStreak(trainedHands));


            } catch (error) {
                console.error('Error saving Training:', error);
            }

            if (currentHand[`${streetName}Action`] == "{}")
                setActions([]);
            else {
                if (typeof currentHand[`${streetName}Action`] == "string") {
                    const jsonString = currentHand[`${streetName}Action`]
                        .replace(/(\w+)=/g, '"$1":')
                        .replace(/ /g, "_")
                        .replace(/,_/g, ",")
                        .replace(/:"([^"]+?)"/g, (_, value) => {
                            if (value === 'true' || value === 'false' || !isNaN(value)) {
                                return `:${value}`;
                            }
                            return `:"${value}"`;
                        })
                        .replace(/:([^",{}\s]+)([,}])/g, ':\"$1\"$2');

                    const cleanedJsonString = jsonString
                        .replace(/:"(\w+ [^,{}]+)"/g, ':\"$1\"');

                    const array = JSON.parse(jsonString);

                    try {
                        setActions(array);
                        setCurrentPlayer(array[0].player)
                    } catch {
                        console.log("empty object");
                    }
                } else
                    setActions(currentHand[`${streetName}Action`]);
            }
        }
    }, [currentHand, streetName]);

    useEffect(() => {
        if (currentHand) {
            setMySeat(currentHand.heroPosition);
            setRivalSeat(currentHand.villainPosition);
            setMaxPlayers(currentHand.tableType);
            setPokerHand(currentHand);
        }


    }, [pokerHand, streetName]);

    useEffect(() => {
        if (currentHand) {
            setMySeat(currentHand.heroPosition);
            setRivalSeat(currentHand.villainPosition);
            setMaxPlayers(currentHand.tableType);
            setPokerHand(currentHand);
        }

        if (maxPlayers.toString() == '9')
            setCurrentPositions(playerPositions9Max);
        else
            setCurrentPositions(playerPositions6Max);

    }, [mySeat, rivalSeat, maxPlayers, setCurrentPositions, streetName]);

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

        if (index != mySeat && index != rivalSeat) {
            style.opacity = 1;
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
            setResponses({});
            setFinishHand('false');
            setScore(0);
            setTotalActions(0);
            setChips([]);
            setChipsVil([]);
            setPot(1.5);
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
            setResponses({});
            setFinishHand('false');
            setScore(0);
            setTotalActions(0);
            setChips([]);
            setChipsVil([]);
            setPot(1.5);
        }
    };

    const resetHand = () => {
        setMySeat(currentHand.heroPosition);
        setRivalSeat(currentHand.villainPosition);
        setStreetName('preflop');
        setResponses({});
        setFinishHand('false');
        setScore(0);
        setTotalActions(0);
        setChips([]);
        setChipsVil([]);
        setActionIndex(0);
        setCurrentPlayer('Hero');
        setPot(1.5);
    };

    const calculatePot = (action) => {
        let newPot = pot;
        const potWithoutBB = pot; // Excluding the initial 1.5bb pot

        if (action.action.includes('OR')) {
            const amount = parseFloat(action.action.split('_')[1].replace('bb', ''));
            console.log('OR', newPot+' - '+ amount);
            setBet(amount);
            newPot += amount;
        } else if (action.action.includes('BET')) {
            const percentage = parseFloat(action.action.split('_')[1].replace('%', '')) / 100;
            console.log('BET', newPot+' - '+ potWithoutBB * percentage);
            setBet(potWithoutBB * percentage);
            newPot += potWithoutBB * percentage;
        } else if (action.action.includes('RAISE')) {
            const multiplier = parseFloat(action.action.split('_')[1].replace('x', ''));
            const previousBet = actions[actionIndex - 1];
            if (previousBet && previousBet.action.includes('BET') ) {
                const percentage = parseFloat(previousBet.action.split('_')[1].replace('%', '')) / 100;
                console.log('RAISE BET', newPot+' - '+ bet *  multiplier);
                setBet(bet *  multiplier);
                newPot += bet * multiplier;
            }else if(previousBet && previousBet.action.includes('OR')){
                const amount = parseFloat(previousBet.action.split('_')[1].replace('bb', ''));
                console.log('RAISE OR', newPot+' - '+ amount * multiplier);
                setBet(amount *  multiplier);
                newPot += (amount * multiplier);
            }

        } else if (action.action === 'CALL') {


            const previousBet = actions[actionIndex - 1];
            const previousBet2 = actions[actionIndex - 2];

            console.log('call',previousBet);
            if (previousBet && (previousBet.action.includes('BET') || previousBet.action.includes('OR') || previousBet.action.includes('RAISE'))) {
                if (previousBet.action.includes('OR')) {
                    const amount = parseFloat(previousBet.action.split('_')[1].replace('bb', ''));
                    newPot += amount;
                }
                else if (previousBet.action.includes('BET')) {
                    const percentage = parseFloat(previousBet.action.split('_')[1].replace('%', '')) / 100;
                    newPot += potWithoutBB * percentage;
                } else if (previousBet.action.includes('RAISE')) {
                    const multiplier = parseFloat(previousBet.action.split('_')[1].replace('x', ''));
                    const betAction = actions.find(act => act.action.includes('BET'));
                    if (betAction) {
                        const percentage = parseFloat(betAction.action.split('_')[1].replace('%', '')) / 100;
                        newPot += potWithoutBB * percentage * multiplier;
                    }else{
                        newPot += (parseFloat(previousBet2.action.split('_')[1].replace('bb', ''))*multiplier)
                    }



                }
            }
        }

        setPot(parseFloat(newPot.toFixed(1)));
    };

    const getCurrentButtons = (actions, currentIndex) => {
        if (!actions || actions.length === 0 || currentIndex >= actions.length) {
            return [];
        }

        const currentPlayer = actions[currentIndex].player;
        let currentButtons = [];

        for (let i = currentIndex; i < actions.length; i++) {
            if (actions[i].player === currentPlayer) {
                currentButtons.push(actions[i]);
            } else {
                break;
            }
        }

        let referenceActions = [];

        if (streetName === 'preflop') {
            if (currentIndex != 1)
                referenceActions = preflopFirstActions;
            else
                referenceActions = vsAggressiveActions;
        } else if (vsAggressiveActions.includes(currentAction.action)) {
            referenceActions = vsAggressiveActions;
        } else if (vsPassiveActions.includes(currentAction.action)) {
            referenceActions = vsPassiveActions;
        }

        if (currentPlayer === 'Hero') {
            for (let i = 0; i < referenceActions.length; i++) {
                if (referenceActions[i] !== currentButtons[0].action) {
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

        let newCurrentButtons = [];
        const previousAction = actions[currentIndex - 1];
        if (previousAction && previousAction.player === 'Villain' && previousAction.action === 'ALL-IN') {
            newCurrentButtons = currentButtons.filter(button => button.action === 'CALL' || button.action === 'FOLD');
        } else {
            newCurrentButtons = currentButtons;
        }

        // Find the correct button
        const correctButton = newCurrentButtons.find(button => button.isCorrect);

        // Filter out the correct button
        let otherButtons = newCurrentButtons.filter(button => !button.isCorrect);

        // Shuffle the other buttons randomly
        otherButtons = otherButtons.sort(() => Math.random() - 0.5);

        // Limit the total buttons to 4, including the correct button
        let limitedButtons = [];
        if (correctButton) {
            limitedButtons = [correctButton, ...otherButtons.slice(0, 3)];

        } else {
            limitedButtons = otherButtons.slice(0, 4);
        }

        return limitedButtons;
    };


    const handleActionClick = (action) => {

        calculatePot(action);

        if (currentPlayer === 'Hero') {
            setResponses(prevResponses => ({
                ...prevResponses,
                [streetName]: [...(prevResponses[streetName] || []), action]
            }));

            setTotalActions(prevTotalActions => prevTotalActions + 1);

            if (action.isCorrect === 'true') {
                setScore(prevScore => prevScore + 1);
            } else {
                setFinishHand('true');
                setCorrectAnswer(actions[actionIndex].action);
            }
        }


        if (action.action.includes('FOLD') || action.action.includes('NONE')) {
            setFinishHand('true');
        }

        const previousAction = actions[actionIndex - 1];
        if (previousAction && previousAction.player === 'Villain' && previousAction.action === 'ALL-IN') {
            setFinishHand('true');
        }

        if (['BET', 'RAISE', 'ALL-IN', 'OR', 'CALL'].some(keyword => action.action.includes(keyword))) {

            if(currentPlayer=== 'Hero') {
                setChips(prevChips => [...prevChips, action.action]);
                if (action.action.includes('RAISE'))
                    setChips(prevChips => [...prevChips, action.action]);
            }
            else {
                setChipsVil(prevChips => [...prevChips, action.action]);
                if (action.action.includes('RAISE'))
                    setChipsVil(prevChips => [...prevChips, action.action]);
            }
        }

        const nextActionIndex = actions.findIndex((act, idx) => act.player !== currentPlayer && idx > actionIndex);

        if (nextActionIndex !== -1) {
            setActionIndex(nextActionIndex);
            setCurrentPlayer(actions[nextActionIndex].player);



            if (actions[nextActionIndex].action.search('FOLD') > -1) {
                setFinishHand('true');
            }
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
        const hue = (percentage * 1.2).toString(10);
        return `hsl(${hue}, 100%, 50%)`;
    };

    const scorePercentage = Math.round((score / totalActions) * 100) || 0;
    const scoreColor = getScoreColor(scorePercentage);


    return (
        <div className="poker-trainer-container-wrapper">
            <div className="poker-trainer-container">
                <div className="trainer-controls-1">
                    <button onClick={handlePreviousHand} disabled={currentHandIndex === 0}><FontAwesomeIcon icon="backward" size="1x" /></button>
                    <text style={{color:'#f9f9f9'}}>{currentHandIndex+1} / {filteredHands.length}</text>
                    <button onClick={handleNextHand} disabled={currentHandIndex === filteredHands.length - 1}><FontAwesomeIcon icon="forward" size="1x" /></button>
                    <div className="statsHud">
                        <div className="tooltip"><FontAwesomeIcon icon="gamepad" size="1x" /><text> {trainedHands.length}</text><span className="tooltip-text">Jugadas</span></div>
                        <div className="tooltip"><FontAwesomeIcon icon="trophy" size="1x" /><text> {trainedHands.filter(hand => hand.score >= 75).length}</text><span className="tooltip-text">Correctas</span></div>
                        <div className="tooltip"><FontAwesomeIcon icon="fire-flame-curved" size="1x" /><text> {streakHands.length}</text><span className="tooltip-text">Racha</span></div>
                    </div>
                </div>
                {showModal && (
                    <div className="modal">
                        <p>No se encontraron manos para entrenar en la secuencia {sequence} para el nivel {stake}.</p>
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


                                {(index == mySeat && currentHand) ? (
                                    <>
                                        <div className="trainer-seat-text">{position}</div>
                                        <div className={`chips-container-${index}`}>
                                            {chips.map((chip, index) => (
                                                <div key={index} className="chip">
                                                </div>
                                            ))}

                                        </div>
                                        <div className="trainer-board-cards-hero">

                                            <CardSelector card="myHand_1" trainer="true" />
                                            <CardSelector card="myHand_2" trainer="true" />
                                        </div>
                                    </>
                                ) : (index == rivalSeat && currentHand) ? (
                                    <>
                                        <div className="trainer-seat-text">{(currentPlayer!=='Hero' && currentPlayer) ? currentAction.action.replace('_',' ') : position}</div>
                                        <div className={`chips-container-${index}`}>
                                        {chipsVil.map((chip, index) => (
                                            <div key={index} className="chip">
                                            </div>
                                        ))}

                                        </div>

                                        <div className="trainer-board-cards-hero">
                                            <CardSelector card="trainerCard" trainer="true" />
                                            <CardSelector card="trainerCard" trainer="true" />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                    <div className="trainer-seat-text">{position}</div>
                                    <div className="trainer-board-cards-hidden">
                                        FOLDED
                                    </div>
                                        </>
                                )}
                                {position === 'BU' && (
                                    <button className="dealer-button">D</button>
                                )}
                            </div>
                        ))}
                        <div className="trainer-table-center">

                            <div className="board-cards section ">
                                {(streetName === 'flop' || streetName === 'turn' || streetName === 'river') && (
                                    <>
                                        <CardSelector card="flopCards_1" trainer="true" />
                                        <CardSelector card="flopCards_2" trainer="true" />
                                        <CardSelector card="flopCards_3" trainer="true" />
                                    </>
                                )}
                                {(streetName === 'turn' || streetName === 'river') && <CardSelector card="turnCard" trainer="true" />}
                                {streetName === 'river' && <CardSelector card="riverCard" trainer="true" />}
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
                                Pot: {pot} bb
                            </div>
                        </div>
                    </div>
                </div>
                <div className="trainer-controls-2">
                    {(currentAction && finishHand === 'false' && currentPlayer === 'Hero') && (
                        <p className="heroAction">Qué haces?</p>
                    )}
                    {(finishHand === 'false' && currentAction) ? (
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
                    ) : (
                        <button onClick={resetHand}>Volver a jugar <FontAwesomeIcon icon="rotate-left" size="1x" /></button>
                    )}
                </div>
            </div>
            <div className="trainer-responses">
                <div className="trainer-responses-container">
                    <h3>Spot: {currentHand ? currentHand.handTitle : ''}</h3>
                    <h5 style={{color:'white'}}>{currentHand ? currentHand.description : ''}</h5>

                    <h4>Acciones:</h4>
                    {Object.keys(responses).map(street => (
                        <div key={street}>

                            {responses[street].map((response, index) => (

                                <p
                                    key={index}
                                    style={{ marginRight:'5px',color:'#f9f9f9', backgroundColor: isCorrectResponse(response, street) ? '#4caf50' : 'red', border:'1px solid #f9f9f9', width:'auto', padding:'3px',borderRadius:'5px' }}
                                >
                                    {street}: {response.action.replace(/_/g, ' ')} {isCorrectResponse(response, street) ? <FontAwesomeIcon icon="check" size="1x" /> : <FontAwesomeIcon icon="xmark" size="1x" />}

                                </p>

                            ))}


                        </div>
                    ))}
                    {finishHand === 'true' && (
                        <>
                            <div className="score" style={{ color: scoreColor, fontSize:'20px',fontWeight:'bold' }}>
                                Score: {scorePercentage}%

                            </div>
                            <Text style={{paddingTop:'5px',color:'white'}}>({score}/{totalActions} acciones correctas)</Text>
                            <h5 style={{color:'yellow'}}>La accion correcta era {correctAnswer.replace('_',' ')}</h5>
                            <Text style={{paddingTop:'20px',color:'white'}}>Notas: </Text>
                            <p>Preflop</p>
                            <div className="handNotes-trainer" dangerouslySetInnerHTML={{__html: currentHand.preflopNotes}}></div>
                            <p>Flop</p>
                                <div className="handNotes-trainer" dangerouslySetInnerHTML={{__html: currentHand.flopNotes}}></div>
                            <p>Turn</p>
                                    <div className="handNotes-trainer" dangerouslySetInnerHTML={{__html: currentHand.turnNotes}}></div>
                            <p>River</p>
                                        <div className="handNotes-trainer" dangerouslySetInnerHTML={{__html: currentHand.riverNotes}}></div>

                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PokerTrainer;

/*<React.Fragment key={index}>
    <p className="villainAction">Villano hizo {action.action.replace(/_/g, ' ')}</p>
    <button onClick={() => handleActionClick(action)}>
        Ok
    </button>
</React.Fragment>*/