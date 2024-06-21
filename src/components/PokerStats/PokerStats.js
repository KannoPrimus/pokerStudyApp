import React, { useState, useEffect, useContext } from 'react';
import { PokerHandContext } from '../PokerHandContext/PokerHandContext';
import { useAuthenticator } from '@aws-amplify/ui-react';
import './PokerStats.css';
import { generateClient } from "aws-amplify/api";
import { listHands as listHandsQuery } from "../../graphql/queries";

const client = generateClient();
const playerPositions6Max = ['SB', 'BB', 'UTG', 'MP', 'CO', 'BU'];
const posibleActions = ["FOLD", "CALL", "RAISE_x3", "RAISE_x5", "ALL-IN", "CHECK", "BET_33%", "BET_50%", "BET_75%", "BET_125%"];

function PokerStats({ sequence, stake, membership }) {
    const { signOut, user } = useAuthenticator();
    const { pokerHand, setPokerHand, pokerHandList, fetchPokerHandsTrainer, resetPokerHand, resetPokerHandList } = useContext(PokerHandContext);
    const [handsData, setHandsData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAllHands();
    }, []);

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
                            actions: { flop: [], turn: [], river: [] }
                        };
                    }
                    groupedData[key].actions.flop.push(...hand.actions.flop);
                    groupedData[key].actions.turn.push(...hand.actions.turn);
                    groupedData[key].actions.river.push(...hand.actions.river);
                });

                // Convertir el objeto a un array y ordenar por handTitle
                return Object.values(groupedData).sort((a, b) => a.handTitle.localeCompare(b.handTitle));
            };

            try {
                const nuevaData = reestructurarData(result.data);
                const groupedData = groupDataByHandTitleAndBoardType(nuevaData);

                setHandsData(groupedData);
            } catch (error) {
                console.error('Error fetching hands response:', error.message);
            }

        } catch (error) {
            console.error('Error fetching hands response:', error);
        } finally {
            setLoading(false);
        }
    };

    const processActions = (actions) => {
        const actionCounts = { 'FOLD': 0,'CHECK': 0, 'CALL': 0, 'RAISE_x3': 0, 'RAISE_x5': 0,  'BET_33%': 0, 'BET_50%': 0, 'BET_75%': 0, 'BET_125%': 0, 'ALL_IN': 0 };
        let totalActions = 0;

        console.log(actions);

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

        console.log(actionPercentages);

        return actionPercentages;
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
                <div className="action-div-freq">{actionPercentages[action].toFixed(2)}%</div>
            </div>
        ));
    };


    return (
        <div className="poker-stats-wrapper">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="poker-stats-table">
                    <thead>
                    <tr >
                        <th style={{fontWeight: 'bold',textAlign:'left'}}>Spot</th>
                        <th style={{fontWeight: 'bold',textAlign:'left',leftPadding:'10px'}}>Tipo de board</th>
                        <th>Flop Actions</th>
                        <th>Turn Actions</th>
                        <th>River Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {handsData.map((hand, index) => (
                        <tr key={index}>
                            <td style={{fontWeight: 'bold',textAlign:'left'}}>{hand.handTitle}</td>
                            <td style={{color: '#00ECB3',textAlign:'left',leftPadding:'10px'}}>{hand.boardClassification}</td>
                            <td>
                                <div className="action-container">
                                    {renderActionDivs(processActions(hand.actions.flop))}
                                </div>
                            </td>
                            <td>
                                <div className="action-container">
                                    {renderActionDivs(processActions(hand.actions.turn))}
                                </div>
                            </td>
                            <td>
                                <div className="action-container">
                                    {renderActionDivs(processActions(hand.actions.river))}
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
