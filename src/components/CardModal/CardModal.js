import React from 'react';
import './CardModal.css'; // Asegúrate de que el archivo CSS está correctamente importado

function CardModal({ isOpen, onSelectCard  }) {
    if (!isOpen) return null;


    const suits = ['♠', '♣', '♥', '♦']; // Ejemplo de palos de naipes
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']; // Ejemplo de rangos
    const suitColors = {
        '♠': '#808080', // Gris plomo
        '♣': '#008000', // Verde
        '♥': '#ff1405', // Rojo
        '♦': '#5e4fff'  // Azul
    };

    return (
        <div className="modal-overlay" >
            <div className="modal-content">

                {suits.map(suit => (
                    <div key={suit} style={{ display: 'flex', flexDirection: 'row' }}>
                        {ranks.map(rank => (
                            <button className="button-card" key={rank + suit} onClick={(e) => {
                                console.log('Selecting card:', rank + suit);
                                e.stopPropagation();  // Detener la propagación para evitar que otros manejadores de clics se activen
                                onSelectCard(rank + suit);
                            }} style={{ margin: '5px',backgroundColor: suitColors[suit] }}>
                                {rank + suit}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CardModal;
