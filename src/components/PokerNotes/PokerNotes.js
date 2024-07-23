import React, { useState, useEffect, useContext, useRef } from 'react';
import './PokerNotes.css';
import { PokerHandContext } from '../PokerHandContext/PokerHandContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the necessary CSS styles
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { listHands as listHandsQuery } from "../../graphql/queries";
import { generateClient } from "aws-amplify/api";

library.add(fas);

const playerPositions6Max = ['SB', 'BB', 'UTG', 'MP', 'CO', 'BU'];
const client = generateClient();

function PokerNotes({ id, membership }) {
    const noteRef = useRef(null);
    const [savedNote, setSavedNote] = useState('');
    const { pokerHand, updatePokerHand,pokerHandList } = useContext(PokerHandContext);
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        switch (id) {
            case 'Preflop':
                noteRef.current.innerHTML = pokerHand.preflopNotes;
                break;
            case 'Flop':
                noteRef.current.innerHTML = pokerHand.flopNotes;
                break;
            case 'Turn':
                noteRef.current.innerHTML = pokerHand.turnNotes;
                break;
            case 'River':
                noteRef.current.innerHTML = pokerHand.riverNotes;
                break;
            default:
                break;
        }
    }, [pokerHand]);

    useEffect(() => {
        switch (id) {
            case 'Preflop':
                updatePokerHand('preflopNotes', savedNote);
                break;
            case 'Flop':
                updatePokerHand('flopNotes', savedNote);
                break;
            case 'Turn':
                updatePokerHand('turnNotes', savedNote);
                break;
            case 'River':
                updatePokerHand('riverNotes', savedNote);
                break;
            default:
                break;
        }
    }, [savedNote]);

    const handleBlur = () => {
        const htmlContent = noteRef.current.innerHTML;
        setSavedNote(htmlContent);
        updatePokerHand(`${id.toLowerCase()}Notes`, htmlContent);
    };

    const generateHandData = (pokerHand) => {
        return {
            hand: {
                title: pokerHand.handTitle,
                description: pokerHand.description,
                hero_cards: pokerHand.myHand_1 + pokerHand.myHand_2,
                villain_position: playerPositions6Max[pokerHand.villainPosition],
                hero_position: playerPositions6Max[pokerHand.heroPosition],
                streets: {
                    preflop: {
                        //actions: pokerHand.preflopAction
                    },
                    flop: {
                        cards: pokerHand.flopCards_1 + pokerHand.flopCards_2 + pokerHand.flopCards_3,
                        //actions: pokerHand.flopAction
                    },
                    turn: {
                        cards: pokerHand.turnCard,
                        //actions: pokerHand.turnAction
                    },
                    river: {
                        cards: pokerHand.riverCard,
                        //actions: pokerHand.riverAction
                    }
                }
            }
        };
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
        setLoading(true);
        const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
        const endpoint = 'https://api.openai.com/v1/chat/completions'; // Updated endpoint
        const handData = generateHandData(pokerHand);
        const handDataHistory = cleanHandsArray(pokerHandList);
        console.log(handData);
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
                    content: `Tengo esta informacion de mi mano de poker :\\n\\nHand Data:\\n${JSON.stringify(handData, null, 2)}, basado en el historial de manos que te proporcione y esta informacion, cual es la accion mas comun de Hero en el ${id}?`
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
            setSavedNote(pokerHand[`${id.toLowerCase()}Notes`] + ' - **ChatGPT: ' + result.choices[0].message.content);
        } catch (error) {
            console.error('Error fetching OpenAI response:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div  style={{ position: 'relative', color: 'white', fontWeight: 'bold' }}>
            <FontAwesomeIcon icon="clipboard" /> Notas {id}

            <div
                ref={noteRef}
                contentEditable
                onBlur={handleBlur}
                className="poker-notes"
                style={{
                    minHeight: '150px',
                    cursor: 'text',
                    overflow: 'auto',
                    position: 'relative',
                    fontWeight: 'normal'
                }}
            />


        </div>
    );
}

export default PokerNotes;

/*
<div className="tooltip-gpt">
                <button className="chatGPT-note" onClick={fetchOpenAIResponse} disabled={loading || membership === 'BASIC'}>
                    {loading ? 'Loading...' : (<FontAwesomeIcon icon="robot" />)}
                </button>
                <span className="tooltip-text">ChatGPT (Experimental)</span>
            </div>
* */