import React, { useState, useEffect, useContext , useRef} from 'react';
import './PokerNotes.css'
import { PokerHandContext } from '../PokerHandContext/PokerHandContext';

function PokerNotes({ id }) {
    const noteRef = useRef(null);
    const [savedNote, setSavedNote] = useState('');
    const { pokerHand, updatePokerHand } = useContext(PokerHandContext);

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
                localStorage.setItem(id, htmlContent);
                break;
            case 'Flop':
                updatePokerHand('flopNotes', htmlContent);
                localStorage.setItem(id, htmlContent);
                break;
            case 'Turn':
                updatePokerHand('turnNotes', htmlContent);
                localStorage.setItem(id, htmlContent);
                break;
            case 'River':
                updatePokerHand('riverNotes', htmlContent);
                localStorage.setItem(id, htmlContent);
                break;
            default:
                break;
        }

        console.log(id);

    };



    return (
        <div

            ref={noteRef}
            contentEditable
            onBlur={handleBlur}
            className="poker-notes"
            style={{
                minHeight: '150px', // Asegúrate de que el contenido tenga suficiente espacio
                cursor: 'text',
                overflow: 'auto',
                position: 'relative' // Posición relativa para los pseudo-elementos
            }}
        />
    );
}

export default PokerNotes;
