import React, { useState, useEffect, useContext } from 'react';
import { PokerHandContext } from '../PokerHandContext/PokerHandContext';
import { useAuthenticator } from '@aws-amplify/ui-react';
import CardSelector  from '../CardSelector/CardSelector';
import './PokerTrainer.css';

function PokerTrainer({sequence}) {
    const { signOut, user } = useAuthenticator();
    const { pokerHand, setPokerHand , pokerHandList, fetchPokerHands  } = useContext(PokerHandContext);
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
    const playerPositions6Max = ['UTG', 'MP', 'CO', 'BU', 'SB', 'BB'];
    const playerPositions9Max = ['UTG', 'MP', 'CO', 'BU', 'SB', 'BB', 'MP2', 'MP3', 'HJ'];
    const [finishHand,setFinishHand] =useState('false');
    const [actionIndex, setActionIndex] = useState(0);

    useEffect(() => {
        fetchPokerHands(user.username);

    }, []);

    useEffect(() => {
        const filtered = pokerHandList.filter(hand => hand.handTitle.toLowerCase().includes(sequence.toLowerCase()));
        setFilteredHands(filtered);

        if (filtered.length > 0) {
            setActions([]);
            setCurrentHand(filtered[0]);
            setCurrentHandIndex(0);
            setMySeat('');
            setRivalSeat('');
        }


    }, [sequence, pokerHandList]);


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

        if (index == mySeat) {

            return { backgroundColor: '#4CAF50' };
        } else if (index == rivalSeat) {

            return { backgroundColor: '#FF5722' };
        }
        return {};
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
        }
    };

    // Filtrar acciones del Hero para la calle específica (Flop)
    const heroActions = actions.filter(action => /*action.player === 'Hero' &&*/ action.street.toLowerCase() === streetName);

    const handleActionClick = (action,arr) => {

        // Registrar la acción seleccionada en el estado de respuestas
        setResponses(prevResponses => ({
            ...prevResponses,
            [streetName]: [...(prevResponses[streetName] || []), action]
        }));


        // Lógica para manejar el clic en el botón de acción
        console.log(`Action clicked: ${action.action}`);
        console.log(currentAction.player+ ' - '+arr );
        // Aquí puedes agregar la lógica que desees realizar al hacer clic en una acción
        // Avanzar a la siguiente etapa del juego
        if (actionIndex < actions.length - 1) {
            setActionIndex(actionIndex + arr);

        } else {
            if (streetName === 'preflop') {
                setStreetName('flop');

            } else if (streetName === 'flop') {
                setStreetName('turn');

            } else if (streetName === 'turn') {
                setStreetName('river');

            } else if (streetName === 'river') {
                // Opcional: puedes definir una lógica para cuando se llegue al final del River
                console.log('Reached the end of the stages');
                setFinishHand('true');
            }
        }
    };

    const handleNext = () => {
        // Avanzar al siguiente índice de acción
        if (actionIndex < actions.length - 1) {
            setActionIndex(actionIndex + 1);
        } else {
            // Avanzar a la siguiente etapa del juego
            if (streetName === 'preflop') {
                setStreetName('flop');
            } else if (streetName === 'flop') {
                setStreetName('turn');
            } else if (streetName === 'turn') {
                setStreetName('river');
            }
            setActionIndex(0);
        }
    };

    const currentAction = actions[actionIndex];

    return (
        <div className="poker-trainer-container">
            <div className="trainer-controls">
                <button onClick={handlePreviousHand} disabled={currentHandIndex === 0}>Anterior</button>
                <button onClick={handleNextHand} disabled={currentHandIndex === filteredHands.length - 1}>Siguiente</button>
            </div>
            <div className="trainer-poker-table">
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
            <div className="trainer-controls">

                {(finishHand==='false' && currentAction && currentAction.player === 'Hero' && streetName !== 'River') && (

                    actions
                        .filter(action => action.player === 'Hero' && action.street.toLowerCase() === streetName)
                        .map((action, index,arr) => (

                            <button key={index} onClick={() => handleActionClick(action,arr.length)}>
                                {action.action.replace(/_/g,' ')}
                            </button>

                        ))

                )}
                {(currentAction && currentAction.player === 'Villain') && (
                    <div>
                        <p className="villainAction">{`${currentAction.player} ${currentAction.action}`}</p>
                        <button onClick={handleNext}>Next</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PokerTrainer;

