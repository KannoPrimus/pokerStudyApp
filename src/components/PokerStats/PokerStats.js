import React, { useState, useEffect, useContext } from 'react';
import { PokerHandContext } from '../PokerHandContext/PokerHandContext';
import PokerHandMatrix from '../CardMatrix/PokerHandMatrix'
import { useAuthenticator } from '@aws-amplify/ui-react';
import './PokerStats.css';
import { generateClient } from "aws-amplify/api";
import { listHands as listHandsQuery } from "../../graphql/queries";
import PokerHand from 'poker-hand-evaluator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

const client = generateClient();
const playerPositions6Max = ['SB', 'BB', 'UTG', 'MP', 'CO', 'BU'];
const posibleActions = ["FOLD", "CALL", "RAISE_x3", "RAISE_x5", "ALL-IN", "CHECK", "BET_10%", "BET_25%", "BET_33%", "BET_50%", "BET_60%", "BET_75%", "BET_100%", "BET_125%"];
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
const boardTypes = ['No 3straight','3straight bajo','3straight medio','3straight alto','Monocolor','Pareado','HLL','HHL'];
const handStrengths = ['STRAIGHT_FLUSH','FOUR_OF_A_KIND','FULL_HOUSE','FLUSH','STRAIGHT','THREE_OF_A_KIND','TWO_PAIRS','ONE_PAIR','HIGH_CARD'];
const handSources = [
    { value: 'user', label: 'Mis Manos' },
    { value: 'crusher-nl50', label: 'Crushers - NL50' },
    { value: 'crusher-nl100', label: 'Crushers - NL100' },
    { value: 'crusher-nl200', label: 'Crushers - NL200' },
    { value: 'todos', label: 'Todos los crushers' },
];

const suitColors = {
    '♠': '#808080', // Gris para Espadas
    '♣': '#25C6A2', // Verde para Tréboles
    '♥': '#C62549', // Rojo para Corazones
    '♦': '#5e4fff'  // Azul para Diamantes
};



function PokerStats({ sequence, stake, membership }) {
    const { signOut, user } = useAuthenticator();
    const { pokerHand, setPokerHand, pokerHandList, fetchPokerHandsTrainer, resetPokerHand, resetPokerHandList } = useContext(PokerHandContext);
    const [handsData, setHandsData] = useState([]);
    const [handsDataGrouped, setHandsDataGrouped] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedActionsFlop, setSelectedActionsFlop] = useState([]);
    const [selectedActionsTurn, setSelectedActionsTurn] = useState([]);
    const [selectedActionsRiver, setSelectedActionsRiver] = useState([]);
    const [response, setResponse] = useState('');
    const [loadingGpt, setLoadingGpt] = useState(false);

    const [filters, setFilters] = useState({
        spot: [''],
        boardType: [''],
        flopAction: [''],
        turnAction: [''],
        riverAction: [''],
        handValueFlop: [''],
        handValueTurn: [''],
        handValueRiver: [''],
    });

    useEffect(() => {
        fetchAllHands('user','');
    }, []);

    const getSuitColor = (card) => {
        if (!card) return '#000'; // Color por defecto si la carta es nula o indefinida
        const suit = card.slice(-1);
        return suitColors[suit] || '#000';
    };

    const handleFilterChange = (e) => {



        if(e.target.name==='source')
            fetchAllHands(e.target.value,e.target.value);

        const options = e.target.options;
        const selectedValues = [];
        for (const option of options) {
            if (option.selected) {
                selectedValues.push(option.value);
            }
        }

        setFilters({
            ...filters,
            //[e.target.name]: e.target.value,
            [e.target.name]: selectedValues,
        });
    };

    const filterDataGrouped = (data) => {
        return data.filter(hand => {
            const { spot, boardType, flopAction, turnAction, riverAction } = filters;



            const spotMatch =  spot.includes('') || spot.includes(hand.handTitle);
            const boardTypeMatch = boardType.includes('') || boardType.includes(hand.boardClassification);


            const flopActionMatch = flopAction.includes('') || hand.actions.flop
                .filter(action => action.player === 'Hero')
                .some(action => flopAction.includes(action.action));

            const turnActionMatch = turnAction.includes('') || hand.actions.turn
                .filter(action => action.player === 'Hero')
                .some(action => turnAction.includes(action.action));

            const riverActionMatch = riverAction.includes('') || hand.actions.river
                .filter(action => action.player === 'Hero')
                .some(action => riverAction.includes(action.action));

            return spotMatch && boardTypeMatch && flopActionMatch && turnActionMatch && riverActionMatch;
        });
    };


    const filterData = (data) => {

        return data.filter(hand => {


            const isHandValueFlopValid = (filters.handValueFlop.includes('') ||
                (hand.strength.flop !== null && filters.handValueFlop.includes(hand.strength.flop.rank)));

            const isHandValueTurnValid = (filters.handValueTurn.includes('') ||
                (hand.strength.turn !== null && filters.handValueTurn.includes(hand.strength.turn.rank)));

            const isHandValueRiverValid = (filters.handValueRiver.includes('') ||
                (hand.strength.river !== null && filters.handValueRiver.includes(hand.strength.river.rank)));


            const { spot, boardType, flopAction, turnAction, riverAction } = filters;

            const spotMatch =  spot.includes('') || spot.includes(hand.handTitle);
            const boardTypeMatch = boardType.includes('') || boardType.includes(hand.boardClassification);

            const flopActionMatch = flopAction.includes('') || hand.actions.flop
                .filter(action => action.player === 'Hero')
                .some(action => flopAction.includes(action.action));

            const turnActionMatch = turnAction.includes('') || hand.actions.turn
                .filter(action => action.player === 'Hero')
                .some(action => turnAction.includes(action.action));

            const riverActionMatch = riverAction.includes('') || hand.actions.river
                .filter(action => action.player === 'Hero')
                .some(action => riverAction.includes(action.action));

            return spotMatch && boardTypeMatch && flopActionMatch && turnActionMatch && riverActionMatch && isHandValueFlopValid && isHandValueTurnValid && isHandValueRiverValid;
        });
    };




    const fetchAllHands = async (source = null, searchString='') => {
        setLoading(true);
        const filter = {};

        if (source == 'user') {
            filter.playerId = { eq: user.username };

        }else if(source == 'todos'){
            filter.description = { contains: '' };
        }
        else
        {
            filter.description = { contains: searchString };

        }


        try {
            const result = await client.graphql({
                query: listHandsQuery,
                variables: { filter }
            });


            const parseActions = (actionString) => {
                const actionList = actionString.slice(1, -1).split('},').map(action => action.endsWith('}') ? action : action + '}');
                return actionList.map(action => {
                    const actionObj = {};
                    action.replace(/[{}]/g, '').split(', ').forEach(part => {
                        const [key, value] = part.split('=');
                        actionObj[key.replace(/ /g, "")] = value;
                    });
                    return actionObj;
                });
            };

            const calculateHandStrength = (street, myHand, board) => {
                let combinedCards;

                for (let i = 0; i < myHand.length; i++) {

                    if(myHand[i]=='' || myHand[i]==null)
                        continue;

                    myHand[i] = myHand[i].replace('♠','S');
                    myHand[i] = myHand[i].replace('♣','C');
                    myHand[i] = myHand[i].replace('♥','H');
                    myHand[i] = myHand[i].replace('♦','D');
                }

                for (let i = 0; i < board.length; i++) {

                    if(board[i]=='' || board[i]==null)
                        continue;

                    board[i] = board[i].replace('♠','S');
                    board[i] = board[i].replace('♣','C');
                    board[i] = board[i].replace('♥','H');
                    board[i] = board[i].replace('♦','D');
                }

                switch (street) {
                    case 'flop':
                        combinedCards = [...myHand, ...board.slice(0, 3)];

                        break;
                    case 'turn':
                        combinedCards = [...myHand, ...board.slice(0, 4)];
                        break;
                    case 'river':
                        combinedCards = [...myHand, ...board];
                        break;
                    default:
                        break;
                }


                // Función para obtener todas las combinaciones de n elementos de un array
                const getAllCombinations = (array, n) => {
                    const results = [];

                    const combine = (prefix, array) => {
                        if (prefix.length === n) {
                            results.push(prefix);
                            return;
                        }

                        for (let i = 0; i < array.length; i++) {
                            combine([...prefix, array[i]], array.slice(i + 1));
                        }
                    };

                    combine([], array);
                    return results;
                };

                // Función para evaluar todas las combinaciones y retornar la mejor mano
                const getBestHand = (combinations) => {

                    let bestHand = null;
                    let handEval = null;

                    combinations.forEach((combination) => {

                        //console.log(combination.join(' '));

                        if(combination[3]=='' || combination[4]=='' )
                            return;

                        try {
                            handEval = new PokerHand(combination.join(' '));
                        }catch{
                            return;
                        }

                        if (!bestHand || handEval.score < bestHand.score) {
                            bestHand = handEval;
                        }
                    });

                    return bestHand;
                };

                const allCombinations = getAllCombinations(combinedCards, 5);
                //console.log(street, allCombinations);

                const bestHand = getBestHand(allCombinations);

                return bestHand;
            };



            const classifyBoard = (flopCards) => {
                const cardValues = flopCards.map(card => "23456789TJQKA".indexOf(card[0]));
                const cardSuits = flopCards.map(card => card[1]);
                const isMonocolor = cardSuits.every(suit => suit === cardSuits[0]);
                const sortedValues = cardValues.slice().sort((a, b) => a - b);
                const isConsecutive = sortedValues[2] - sortedValues[0] === 2 && new Set(sortedValues).size === 3;
                const hasPair = new Set(sortedValues).size < 3;

                if (hasPair) {
                    return 'Pareado';
                } else if (isMonocolor) {
                    return 'Monocolor';
                } else if (isConsecutive) {
                    if (sortedValues[2] < 8) {
                        return '3straight bajo';
                    } else if (sortedValues[0] > 4 && sortedValues[2] < 12) {
                        return '3straight medio';
                    } else {
                        return '3straight alto';
                    }
                } else if (sortedValues.every(value => value < 11)) {
                    return 'No 3straight';
                } else if (sortedValues.filter(value => value > 10).length === 1) {
                    return 'HLL';
                } else if (sortedValues.filter(value => value > 10).length === 2) {
                    return 'HHL';
                } else {
                    return 'Otro';
                }
            };

            const reestructurarData = (data) => {
                if (!data || !data.listHands || !Array.isArray(data.listHands.items)) {
                    console.error("Data o sus propiedades necesarias no están definidas.");
                    return [];
                }

                return data.listHands.items.map(hand => {
                    const {
                        handTitle,
                        description,
                        myHand_1,
                        myHand_2,
                        flopCards_1,
                        flopCards_2,
                        flopCards_3,
                        turnCard,
                        riverCard,
                        flopAction,
                        turnAction,
                        riverAction
                    } = hand;

                    const flopCards = [flopCards_1, flopCards_2, flopCards_3];
                    const boardClassification = classifyBoard(flopCards);

                    return {
                        handTitle,
                        description,
                        myHand: [myHand_1, myHand_2],
                        board: [flopCards_1, flopCards_2, flopCards_3, turnCard, riverCard],
                        boardClassification,
                        actions: {
                            flop: parseActions(flopAction),
                            turn: parseActions(turnAction),
                            river: parseActions(riverAction)
                        },
                        strength: {
                            flop: calculateHandStrength('flop',[myHand_1, myHand_2],[flopCards_1, flopCards_2, flopCards_3, turnCard, riverCard]),
                            turn: calculateHandStrength('turn',[myHand_1, myHand_2],[flopCards_1, flopCards_2, flopCards_3, turnCard, riverCard]),
                            river: calculateHandStrength('river',[myHand_1, myHand_2],[flopCards_1, flopCards_2, flopCards_3, turnCard, riverCard])
                        }
                    };
                });
            };

            const groupDataByHandTitleAndBoardType = (data) => {
                const groupedData = {};
                data.forEach(hand => {
                    const key = `${hand.handTitle} + ${hand.boardClassification}`;
                    if (!groupedData[key]) {
                        groupedData[key] = {
                            handTitle: hand.handTitle,
                            boardClassification: hand.boardClassification,
                            actions: { flop: [], turn: [], river: [] },
                            strength: { flop: [], turn: [], river: [] }
                        };
                    }
                    groupedData[key].actions.flop.push(...hand.actions.flop);
                    groupedData[key].actions.turn.push(...hand.actions.turn);
                    groupedData[key].actions.river.push(...hand.actions.river);
                   // groupedData[key].strength.flop.push(...hand.strength.flop);
                   // groupedData[key].strength.turn.push(...hand.strength.turn);
                   // groupedData[key].strength.river.push(...hand.strength.river);
                });

                // Convertir el objeto a un array y ordenar por handTitle
                return Object.values(groupedData).sort((a, b) => a.handTitle.localeCompare(b.handTitle));
            };

            try {
                const nuevaData = reestructurarData(result.data);
                setHandsData(nuevaData);
//console.log(nuevaData);
                const groupedData = groupDataByHandTitleAndBoardType(nuevaData);
                setHandsDataGrouped(groupedData);

            } catch (error) {
                console.error('Error fetching hands response:', error.message);
            }

        } catch (error) {
            console.error('Error fetching hands response:', error);
        } finally {
            setLoading(false);
        }
    };

    const processActions = (actions, sort) => {

        const actionCounts = { 'FOLD': 0,'CHECK': 0, 'CALL': 0, 'RAISE_x3': 0, 'RAISE_x5': 0,  'BET_10%': 0,  'BET_25%': 0,  'BET_33%': 0, 'BET_50%': 0, 'BET_60%': 0, 'BET_75%': 0, 'BET_100%': 0, 'BET_125%': 0, 'ALL_IN': 0 };
        let totalActions = 0;

        //console.log(actions);

        actions.forEach(action => {
            if (action.player === "Hero") {
                const actionType = action.action;//.replace(/[-_]/g, '');
                if (actionCounts[actionType] !== undefined) {
                    actionCounts[actionType]++;
                    totalActions++;
                }
            }
        });

        const actionPercentages = {};
        Object.keys(actionCounts).forEach(key => {
            if (actionCounts[key] > 0) {
                actionPercentages[key] = (actionCounts[key] / totalActions) * 100;
            }
        });


        const sortedActionPercentages = Object.entries(actionPercentages)
            .sort(([, a], [, b]) => b - a)
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});

        return sortedActionPercentages;
    };

    const getColorForPercentage = (percentage, maxPercentage) => {
        const intensity = (percentage / maxPercentage) * 255;
        const r = 255 - intensity;
        const g = intensity;
        const b = 0;
        const alpha = 0.8;

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };


    const renderActionDivs = (actionPercentages) => {
        const maxPercentage = Math.max(...Object.values(actionPercentages));

        return Object.keys(actionPercentages).map((action, index) => (
            <div key={index} className="action-div" style={{ backgroundColor: getColorForPercentage(actionPercentages[action], maxPercentage) }}>
                <div className="action-div-action">{action.replace(/_/g, " ")}</div>
                <div className="action-div-freq">{actionPercentages[action].toFixed(0)}%</div>
            </div>
        ));
    };

    const renderActionDivsIndividual = (actionPercentages) => {
        return actionPercentages
            .filter(action => action.action !== "NONE")
            .map(action => {
                let actionClass = '';

                switch (action.action.toLowerCase()) {
                    case 'all-in':
                        actionClass = 'all-in';
                        break;
                    case 'raise_x3':
                    case 'raise_x5':
                        actionClass = 'raise';
                        break;
                    case 'bet_10%':
                    case 'bet_25%':
                    case 'bet_33%':
                    case 'bet_50%':
                    case 'bet_75%':
                    case 'bet_100%':
                        actionClass = 'bet50';
                        break;
                    case 'bet_125%':
                        actionClass = 'bet125';
                        break;
                    case 'fold':
                        actionClass = 'fold';
                        break;
                    case 'call':
                        actionClass = 'call';
                        break;
                    case 'check':
                        actionClass = 'check';
                        break;
                    default:
                        break;
                }

                return (
                    <div key={action.order} className={action.player==='Hero' ? `action-div ${actionClass}`:'action-div-vill'}>
                        <div className="action-div-action">{action.action.replace('NONE', "").replace('BET_125%', "Over Bet").replace(/_/g, " ")}</div>
                        <div className="action-div-freq">{action.player}</div>
                    </div>
                );
            });
    };

    function cleanHandsArray(handsArray) {


        return handsArray.map(pokerHand => ({
            hand: {
                title: pokerHand.handTitle,
                description: pokerHand.description,
                hero_cards: pokerHand.myHand_1 + pokerHand.myHand_2,
                villain_position: playerPositions6Max[pokerHand.villainPosition],
                hero_position: playerPositions6Max[pokerHand.heroPosition],
                streets: {
                    preflop: {
                        actions: pokerHand.preflopAction
                    },
                    flop: {
                        cards: pokerHand.flopCards_1 + pokerHand.flopCards_2 + pokerHand.flopCards_3,
                        actions: pokerHand.flopAction
                    },
                    turn: {
                        cards: pokerHand.turnCard,
                        actions: pokerHand.turnAction
                    },
                    river: {
                        cards: pokerHand.riverCard,
                        actions: pokerHand.riverAction
                    }
                }
            }
        }));
    }


    const fetchOpenAIResponse = async () => {
        setLoadingGpt(true);
        const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
        const endpoint = 'https://api.openai.com/v1/chat/completions'; // Updated endpoint
        const handDataHistory = filterData(handsData);
        console.log(handDataHistory);

        const prompt = `
                      Ejemplo de Manos:
                ${JSON.stringify(handDataHistory, null, 2)}
        `;


        const data = {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: prompt
                },
                {
                    role: "user",
                    content: `basado en el historial de manos que te proporcione, puedes darme insights sobre tendencias de Hero en las lineas de accion indicando la accion mas frecuente de Hero en cada calle y sus tamaños de apuesta en cada calle. Considera las manos en su conjunto, no me des respuestas de manos individuales.`
                    //content: `Tengo esta informacion de mi mano de poker :\n\nHand Data:\n${JSON.stringify(handData, null, 2)}`
                }
            ],
            max_tokens: 500, // Limiting the tokens
            temperature: 0.3, // Setting the temperature
            top_p: 0.2
        };

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + API_KEY,
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const error = await res.json();
                console.error('Error response from OpenAI:', error);
                throw new Error(`Error: ${error.message}`);
            }

            const result = await res.json();
            setResponse(result.choices[0].message.content);
            //setSavedNote(pokerHand[`${id.toLowerCase()}Notes`] + ' - **ChatGPT: ' + result.choices[0].message.content);
        } catch (error) {
            console.error('Error fetching OpenAI response:', error);
        } finally {
            setLoadingGpt(false);
        }
    };

    return (

        <div className="poker-stats-wrapper">
            <div className="filters-wrapper">
                <div className="selector-wrapper">
                    <span><FontAwesomeIcon icon="dice-d6" size="1x" /> Fuente</span>
                    <select className="input" name="source" value={filters.source}  onChange={handleFilterChange}>

                        {handSources.map((source, index) => (
                            <option key={index} value={source.value}>{source.label}</option>
                        ))}
                    </select>

                    <div className="tooltip">

                        <FontAwesomeIcon icon="circle-question" size="1x" />

                        <span className="tooltip-text">Deja la tecla Control presionada para seleccionar mas de una opción.</span>
                    </div>

                </div>
                <div className="selector-wrapper">
                    <span><FontAwesomeIcon icon="bullseye" size="1x" /> Spot</span>
                <select className="input" multiple={true} name="spot" value={filters.spot} onChange={handleFilterChange}>
                    <option value="">Todos</option>
                    {pokerSequences.map((sequence, index) => (
                        <option key={index} value={sequence}>{sequence}</option>
                    ))}
                </select>
                </div>
                <div className="selector-wrapper">
                    <span><FontAwesomeIcon icon="clipboard-list" size="1x" /> Tipo Board</span>
                <select className="input" multiple={true} name="boardType" value={filters.boardType} onChange={handleFilterChange}>
                    <option value="">Todos</option>
                    {boardTypes.map((boards, index) => (
                        <option key={index} value={boards}>{boards}</option>
                    ))}
                </select>
                </div>
                <div className="selector-wrapper">
                    <span><FontAwesomeIcon icon="crosshairs" size="1x" /> Acción FLOP</span>
                <select className="input" multiple={true} name="flopAction" value={filters.flopAction}  onChange={handleFilterChange}>
                    <option value="">Todos</option>
                    {posibleActions.map((actions, index) => (
                        <option key={index} value={actions}>{actions.replace('_',' ')}</option>
                    ))}
                </select>
                </div>
                <div className="selector-wrapper">
                    <span><FontAwesomeIcon icon="crosshairs" size="1x" /> Acción TURN</span>
                <select className="input" multiple={true} name="turnAction" value={filters.turnAction}  onChange={handleFilterChange}>
                    <option value="">Todos</option>
                    {posibleActions.map((actions, index) => (
                        <option key={index} value={actions}>{actions.replace('_',' ')}</option>
                    ))}
                </select>
                </div>
                <div className="selector-wrapper">
                    <span><FontAwesomeIcon icon="crosshairs" size="1x" /> Acción RIVER</span>
                <select className="input" multiple={true} name="riverAction" value={filters.riverAction}  onChange={handleFilterChange}>
                    <option value="">Todos</option>
                    {posibleActions.map((actions, index) => (
                        <option key={index} value={actions}>{actions.replace('_',' ')}</option>
                    ))}
                </select>
                </div>
                <div className="selector-wrapper">
                    <span><FontAwesomeIcon icon="magnifying-glass-dollar" size="1x" /> Valor al FLOP</span>
                <select className="input" multiple={true} name="handValueFlop" value={filters.handValueFlop} onChange={handleFilterChange}>
                    <option value="">Todos</option>
                    {handStrengths.map((strengths, index) => (
                        <option key={index} value={strengths}>{strengths.replace('_',' ')}</option>
                    ))}
                </select>
                </div>
                <div className="selector-wrapper">
                    <span><FontAwesomeIcon icon="magnifying-glass-dollar" size="1x" /> Valor al TURN</span>
                <select className="input" multiple={true} name="handValueTurn" value={filters.handValueTurn} onChange={handleFilterChange}>
                    <option value="">Todos</option>
                    {handStrengths.map((strengths, index) => (
                        <option key={index} value={strengths}>{strengths.replace('_',' ')}</option>
                    ))}
                </select>
                </div>
                <div className="selector-wrapper">
                    <span><FontAwesomeIcon icon="magnifying-glass-dollar" size="1x" /> Valor al RIVER</span>
                <select className="input" multiple={true} name="handValueRiver" value={filters.handValueRiver} onChange={handleFilterChange}>
                    <option value="">Todos</option>
                    {handStrengths.map((strengths, index) => (
                        <option key={index} value={strengths}>{strengths.replace('_',' ')}</option>
                    ))}
                </select>
                </div>

            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="poker-stats-table-wrapper-1">

                <table className="poker-stats-table">
                    <thead style={{backgroundColor:'#000F18'}}>
                    <tr >
                        <th style={{fontWeight: 'bold',textAlign:'left'}}>Spot</th>
                        <th style={{fontWeight: 'bold',textAlign:'left',leftPadding:'10px'}}>Tipo de board</th>
                        <th>Flop Actions</th>
                        <th>Turn Actions</th>
                        <th>River Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filterDataGrouped(handsDataGrouped).map((hand, index) => (
                        <tr key={index}>
                            <td style={{fontWeight: 'bold',textAlign:'left'}}>{hand.handTitle}</td>
                            <td style={{color: '#00ECB3',textAlign:'left',leftPadding:'10px'}}>{hand.boardClassification}</td>
                            <td >
                                <div className="action-container">
                                    {renderActionDivs(processActions(hand.actions.flop))}
                                </div>
                            </td>
                            <td>
                                <div className="action-container">
                                    {renderActionDivs(processActions(hand.actions.turn))}
                                </div>
                            </td>
                            <td  >
                                <div className="action-container">
                                    {renderActionDivs(processActions(hand.actions.river))}
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            )}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="poker-stats-table-wrapper-2">
                <table className="poker-stats-table">
                    <thead style={{backgroundColor:'#000F18'}}>
                    <tr >

                        <th>Hand</th>
                        <th>Flop</th>
                        <th>Turn</th>
                        <th>River</th>
                        <th>Flop Actions</th>
                        <th>Turn Actions</th>
                        <th>River Actions</th>
                        <th>Flop Strength</th>
                        <th>Turn Strength</th>
                        <th>River Strength</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filterData(handsData).map((hand, index) => (
                        <tr key={index}>

                            <td style={{color: '#00ECB3',textAlign:'left',leftPadding:'10px',width:'80px'}}>
                                <div className="card" style={{ color: getSuitColor(hand.myHand[0]) }}>{hand.myHand[0]}</div>
                                <div className="card" style={{ color: getSuitColor(hand.myHand[1]) }}>{hand.myHand[1]}</div>
                            </td>
                            <td style={{color: '#00ECB3',textAlign:'left',leftPadding:'10px',width:'120px'}}>
                                {(hand.board[0]!='') ? (
                                    <>
                                <div className="card" style={{ color: getSuitColor(hand.board[0]) }}>{hand.board[0]}</div>
                                <div className="card" style={{ color: getSuitColor(hand.board[1]) }}>{hand.board[1]}</div>
                                <div className="card" style={{ color: getSuitColor(hand.board[2]) }}>{hand.board[2]}</div>
                                        </>
                                    ):''}
                            </td>
                            <td style={{color: '#00ECB3',textAlign:'left',leftPadding:'10px'}}>
                                {(hand.board[3]!='') ? (
                                    <>
                                <div className="card" style={{ color: getSuitColor(hand.board[3]) }}>{hand.board[3]}</div>
                                    </>
                                ):''}
                            </td>
                            <td style={{color: '#00ECB3',textAlign:'left',leftPadding:'10px'}}>
                                {(hand.board[4]!='') ? (
                                    <>
                                <div className="card" style={{ color: getSuitColor(hand.board[4]) }}>{hand.board[4]}</div>
                                    </>
                                ):''}
                            </td>
                            <td >
                            <div className="action-container">
                                {renderActionDivsIndividual(hand.actions.flop)}
                            </div>
                        </td>
                            <td>
                                <div className="action-container">
                                    {renderActionDivsIndividual(hand.actions.turn)}
                                </div>
                            </td>
                            <td  >
                                <div className="action-container">
                                    {renderActionDivsIndividual(hand.actions.river)}
                                </div>
                            </td>
                            <td >
                                <div className="action-container">
                                   {(hand.board[0]!='' && hand.strength.flop!==null) ? hand.strength.flop.rank.replace('_',' '):''}
                                </div>
                            </td>
                            <td>
                                <div className="action-container">
                                    {(hand.board[3]!='' && hand.strength.turn!==null) ? hand.strength.turn.rank.replace('_',' '):''}
                                </div>
                            </td>
                            <td  >
                                <div className="action-container">
                                    {(hand.board[4]!='' && hand.strength.river!==null) ? hand.strength.river.rank.replace('_',' '):''}
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            )}

        </div>

    );
}

export default PokerStats;

/*
  <div className="insights-gpt">{response}</div>
<div className="tooltip-gpt">
                        <button className="chatGPT-note" onClick={fetchOpenAIResponse} disabled={loading || membership === 'BASIC'}>
                            {loadingGpt ? 'Loading...' : (<FontAwesomeIcon icon="robot" />)}
                        </button>
                        <span className="tooltip-text">ChatGPT (Experimental)</span>
                    </div>
 */