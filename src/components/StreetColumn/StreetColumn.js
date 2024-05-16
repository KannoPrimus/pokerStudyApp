import React, { useState } from 'react';
import CardSelector from '../CardSelector/CardSelector'; // Asegúrate de que la ruta es correcta
import CardMatrix from '../CardMatrix/CardMatrix';
import PokerTable from '../PokerTable/PokerTable';
import PokerNotes from '../PokerNotes/PokerNotes';
import './StreetColumn.css';

function StreetColumn({ streetName, myRange, rivalRange, notes }) {



    return (
        <div className="street-column-container">
            <span className="title">{streetName}</span>
            <div className="board-cards section ">
                {/* Renderizar CardSelectors basado en el streetName */}
                {streetName === 'Preflop' && <PokerTable />}
                {streetName === 'Flop' && (
                    <>
                        <CardSelector />
                        <CardSelector />
                        <CardSelector />
                    </>
                )}
                {streetName === 'Turn' && <CardSelector />}
                {streetName === 'River' && <CardSelector />}
            </div>
            <div className="section"><PokerNotes id={streetName}/></div>
            <span className="title">Rango Hero</span>
            <div className="section"><CardMatrix id={streetName} myRange="true" />
            </div>
            <span className="title">Rango Villano</span>
            <div className="section"><CardMatrix id={streetName} myRange="false"/></div>

        </div>
    );
}

export default StreetColumn;
