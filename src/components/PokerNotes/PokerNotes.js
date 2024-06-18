import React, { useState, useEffect, useContext, useRef } from 'react';
import './PokerNotes.css';
import { PokerHandContext } from '../PokerHandContext/PokerHandContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the necessary CSS styles
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {listHands as listHandsQuery} from "../../graphql/queries";
import { generateClient } from "aws-amplify/api";

library.add(fas);

const playerPositions6Max = ['SB', 'BB','UTG', 'MP', 'CO', 'BU'];
const client = generateClient();

function PokerNotes({ id }) {
    const noteRef = useRef(null);
    const [savedNote, setSavedNote] = useState('');
    const { pokerHand, updatePokerHand } = useContext(PokerHandContext);
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

    const generateHandData = () => {
        return {
            hand: {
                title: pokerHand.handTitle,
                hero_cards: pokerHand.myHand_1+pokerHand.myHand_2,
                villain_position: playerPositions6Max[pokerHand.villainPosition],
                hero_position: playerPositions6Max[pokerHand.heroPosition],
                streets: {
                    preflop: {
                        //actions: pokerHand.preflopAction

                    },
                    flop: {
                        cards: pokerHand.flopCards_1+pokerHand.flopCards_2+pokerHand.flopCards_3,
                        //actions: pokerHand.flopAction
                    },
                    turn: {
                        cards: pokerHand.turnCard,
                        //actions: pokerHand.turnAction
                    },
                    river: {
                        cards: pokerHand.riverCard,
                       // actions: pokerHand.riverAction
                    }
                }
            }
        };
    };

    const fetchOpenAIResponse = async () => {
        setLoading(true);
        const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
        const endpoint = 'https://api.openai.com/v1/chat/completions'; // Updated endpoint
        const handData = generateHandData();

        const filter = {};
        filter.handTitle = { eq: handData.hand.title };
        filter.share = {eq: 'true'};

        const result = await client.graphql({
            query: listHandsQuery,
            variables: { filter }
        });


        const data = {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "Eres un asistente especializado en estrategia de poker. Siempre provee una respuesta directa y concisa sin dar ningun preambulo. Respondes siempre en español."
                },
                {
                    role: "user",
                    content: `Based on the following hand data and similar hands from the database, provide some concise suggestions from Hero perspective for the specific ${id} street :\n\nHand Data:\n${JSON.stringify(handData, null, 2)}\n\nSimilar Hands:\n${JSON.stringify(result.data.listHands.items, null, 2)}`
                }
            ],
            max_tokens: 200, // Limiting the tokens
            temperature: 0.2 // Setting the temperature
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
            setSavedNote(result.choices[0].message.content);
        } catch (error) {
            console.error('Error fetching OpenAI response:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'relative', color: 'white', fontWeight: 'bold' }}>

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

            <div className="tooltip-gpt">
                <button className="chatGPT-note" onClick={fetchOpenAIResponse} disabled={loading}>
                    {loading ? 'Loading...' : (<FontAwesomeIcon icon="robot" />)}
                </button>
                <span className="tooltip-text">ChatGPT</span>
            </div>
        </div>
    );
}

export default PokerNotes;
