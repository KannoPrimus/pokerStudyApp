import React, { useState, useEffect, useContext , useRef} from 'react';
import './PokerNotes.css'
import { PokerHandContext } from '../PokerHandContext/PokerHandContext';

function PokerNotes({ id }) {
    const noteRef = useRef(null);
    const [savedNote, setSavedNote] = useState('');
    const { pokerHand, updatePokerHand } = useContext(PokerHandContext);
    const [response, setResponse] = useState('');
    //const [loading, setLoading] = useState(false);

    useEffect(() => {


        switch(id) {
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

        switch(id) {
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

        switch(id) {
            case 'Preflop':

                updatePokerHand('preflopNotes', htmlContent);

                break;
            case 'Flop':
                updatePokerHand('flopNotes', htmlContent);

                break;
            case 'Turn':
                updatePokerHand('turnNotes', htmlContent);

                break;
            case 'River':
                updatePokerHand('riverNotes', htmlContent);

                break;
            default:
                break;
        }



    };

    /*const fetchOpenAIResponse = async () => {
        setLoading(true);
        const API_KEY = '';
        const endpoint = 'https://api.openai.com/v1/completions';

        const data = {
            "model": "gpt-3.5-turbo-16k",
            "messages": [
                {
                    "role": "system",
                    "content": "You are a helpful assistant."
                },
                {
                    "role": "user",
                    "content": "Hello!"
                }
            ]
        };

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+API_KEY,

                },
                body: JSON.stringify(data),
            });

            //const result = await res.json();
            //setResponse(result.choices[0].text);
        } catch (error) {
            console.error('Error fetching OpenAI response:', error);
        } finally {
            setLoading(false);
        }
    };

    <button onClick={fetchOpenAIResponse} disabled={loading}>
                {loading ? 'Loading...' : 'Get OpenAI Response'}
            </button>
            <div>
                <h3>Response:</h3>
                <p>{response}</p>
            </div>
    */

    return (
        <div style={{ position: 'relative' }}>

            <div
                ref={noteRef}
                contentEditable
                onBlur={handleBlur}
                className="poker-notes"
                style={{
                    minHeight: '150px',
                    cursor: 'text',
                    overflow: 'auto',
                    position: 'relative'
                }}
            />

        </div>
    );
}

export default PokerNotes;
