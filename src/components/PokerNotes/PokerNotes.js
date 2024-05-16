import React, { useEffect, useRef } from 'react';
import './PokerNotes.css'

function PokerNotes({ id }) {
    const noteRef = useRef(null);

    const handleBlur = () => {
        const htmlContent = noteRef.current.innerHTML;
        console.log(id);
        localStorage.setItem(id, htmlContent);
    };

    useEffect(() => {
        const savedNote = localStorage.getItem(id);
        if (savedNote) {
            noteRef.current.innerHTML = savedNote;
        } else {
            noteRef.current.innerHTML = id;
        }
    }, [id]);

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
