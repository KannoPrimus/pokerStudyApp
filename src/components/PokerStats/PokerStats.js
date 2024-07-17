import React, { useState, useEffect, useContext } from 'react';
import { PokerHandContext } from '../PokerHandContext/PokerHandContext';
import { useAuthenticator } from '@aws-amplify/ui-react';
import './PokerStats.css';
import { generateClient } from "aws-amplify/api";
import { listHands as listHandsQuery } from "../../graphql/queries";
import PokerHand from 'poker-hand-evaluator';

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

    const [filters, setFilters] = useState({
        spot: '',
        boardType: '',
        flopAction: '',
        turnAction: '',
        riverAction: '',
        handValueFlop: '',
        handValueTurn: '',
        handValueRiver: '',
    });

    useEffect(() => {
        fetchAllHands();
    }, []);

    const getSuitColor = (card) => {
        if (!card) return '#000'; // Color por defecto si la carta es nula o indefinida
        const suit = card.slice(-1);
        return suitColors[suit] || '#000';
    };

    /*const handleActionFlopChange = (event) => {
        const options = event.target.options;
        const selectedValues = [];
        for (const option of options) {
            if (option.selected) {
                selectedValues.push(option.value);
            }
        }
        setSelectedActionsFlop(selectedValues);
    };

    const handleActionTurnChange = (event) => {
        const options = event.target.options;
        const selectedValues = [];
        for (const option of options) {
            if (option.selected) {
                selectedValues.push(option.value);
            }
        }
        setSelectedActionsTurn(selectedValues);
    };

    const handleActionRiverChange = (event) => {
        const options = event.target.options;
        const selectedValues = [];
        for (const option of options) {
            if (option.selected) {
                selectedValues.push(option.value);
            }
        }
        setSelectedActionsRiver(selectedValues);
    };*/

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const filterDataGrouped = (data) => {

        return data.filter(hand => {


            return (
                (filters.spot === '' || hand.handTitle === filters.spot) &&
                (filters.boardType === '' || hand.boardClassification === filters.boardType) &&
                (filters.flopAction === '' || hand.actions.flop.filter(action => action.player === 'Hero').some(action => action.action === filters.flopAction)) &&
                (filters.turnAction === '' || hand.actions.turn.filter(action => action.player === 'Hero').some(action => action.action === filters.turnAction)) &&
                (filters.riverAction === '' || hand.actions.river.filter(action => action.player === 'Hero').some(action => action.action === filters.riverAction)) &&

                true
            );
        });
    };

    const filterData = (data) => {

        return data.filter(hand => {
            const isHandValueFlopValid = (filters.handValueFlop === '' || (hand.strength.flop !== null && hand.strength.flop.rank === filters.handValueFlop));
            const isHandValueTurnValid = (filters.handValueTurn === '' || (hand.strength.turn !== null && hand.strength.turn.rank === filters.handValueTurn));
            const isHandValueRiverValid = (filters.handValueRiver === '' || (hand.strength.river !== null && hand.strength.river.rank === filters.handValueRiver));

            return (
                (filters.spot === '' || hand.handTitle === filters.spot) &&
                (filters.boardType === '' || hand.boardClassification === filters.boardType) &&
                (filters.flopAction === '' || hand.actions.flop.filter(action => action.player === 'Hero').some(action => action.action === filters.flopAction)) &&
                (filters.turnAction === '' || hand.actions.turn.filter(action => action.player === 'Hero').some(action => action.action === filters.turnAction)) &&
                (filters.riverAction === '' || hand.actions.river.filter(action => action.player === 'Hero').some(action => action.action === filters.riverAction)) &&
                isHandValueFlopValid &&
                isHandValueTurnValid &&
                isHandValueRiverValid &&
                true
            );
        });
    };




    const fetchAllHands = async () => {
        setLoading(true);
        const filter = {};

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
            .filter(action => action.player === "Hero")
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
                    <div key={action.order} className={`action-div ${actionClass}`}>
                        <div className="action-div-action-ind">{action.action.replace('NONE', "").replace('BET_125%', "Over Bet").replace(/_/g, " ")}</div>
                    </div>
                );
            });
    };



    return (

        <div className="poker-stats-wrapper">
            <div className="filters-wrapper">
                <div className="selector-wrapper">
                    <p>Fuente</p>
                <select className="input" name="crusher" value={filters.spot} onChange={handleFilterChange}>
                    <option value="">Mis manos</option>

                </select>
                </div>
                <div className="selector-wrapper">
                    <p>Spot</p>
                <select className="input" multiple={true} name="spot" value={filters.spot} onChange={handleFilterChange}>
                    <option value="">Todos</option>
                    {pokerSequences.map((sequence, index) => (
                        <option key={index} value={sequence}>{sequence}</option>
                    ))}
                </select>
                </div>
                <div className="selector-wrapper">
                    <p>Tipo Board</p>
                <select className="input" multiple={true} name="boardType" value={filters.boardType} onChange={handleFilterChange}>
                    <option value="">Todos</option>
                    {boardTypes.map((boards, index) => (
                        <option key={index} value={boards}>{boards}</option>
                    ))}
                </select>
                </div>
                <div className="selector-wrapper">
                    <p>Acción FLOP</p>
                <select className="input" multiple={true} name="flopAction" value={filters.flopAction}  onChange={handleFilterChange}>
                    <option value="">Todos</option>
                    {posibleActions.map((actions, index) => (
                        <option key={index} value={actions}>{actions.replace('_',' ')}</option>
                    ))}
                </select>
                </div>
                <div className="selector-wrapper">
                    <p>Acción TURN</p>
                <select className="input" multiple={true} name="turnAction" value={filters.turnAction}  onChange={handleFilterChange}>
                    <option value="">Todos</option>
                    {posibleActions.map((actions, index) => (
                        <option key={index} value={actions}>{actions.replace('_',' ')}</option>
                    ))}
                </select>
                </div>
                <div className="selector-wrapper">
                    <p>Acción RIVER</p>
                <select className="input" multiple={true} name="riverAction" value={filters.riverAction}  onChange={handleFilterChange}>
                    <option value="">Todos</option>
                    {posibleActions.map((actions, index) => (
                        <option key={index} value={actions}>{actions.replace('_',' ')}</option>
                    ))}
                </select>
                </div>
                <div className="selector-wrapper">
                    <p>Valor al FLOP</p>
                <select className="input" multiple={true} name="handValueFlop" value={filters.handValueFlop} onChange={handleFilterChange}>
                    <option value="">Todos</option>
                    {handStrengths.map((strengths, index) => (
                        <option key={index} value={strengths}>{strengths.replace('_',' ')}</option>
                    ))}
                </select>
                </div>
                <div className="selector-wrapper">
                    <p>Valor al TURN</p>
                <select className="input" multiple={true} name="handValueTurn" value={filters.handValueTurn} onChange={handleFilterChange}>
                    <option value="">Todos</option>
                    {handStrengths.map((strengths, index) => (
                        <option key={index} value={strengths}>{strengths.replace('_',' ')}</option>
                    ))}
                </select>
                </div>
                <div className="selector-wrapper">
                    <p>Valor al RIVER</p>
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
            )}

            {loading ? (
                <p>Loading...</p>
            ) : (
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

                            <td style={{color: '#00ECB3',textAlign:'left',leftPadding:'10px'}}>
                                <div className="card" style={{ color: getSuitColor(hand.myHand[0]) }}>{hand.myHand[0]}</div>
                                <div className="card" style={{ color: getSuitColor(hand.myHand[1]) }}>{hand.myHand[1]}</div>
                            </td>
                            <td style={{color: '#00ECB3',textAlign:'left',leftPadding:'10px'}}>
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
            )}

        </div>

    );
}

export default PokerStats;
