import React, { useState, useEffect } from 'react';
import './CardModal.css'; // Asegúrate de que el archivo CSS está correctamente importado

function CardModal({ isOpen, onSelectCard, cardSet }) {
    const [selectedCards, setSelectedCards] = useState([]);

    useEffect(() => {
        setSelectedCards([]);
    }, [cardSet, isOpen]);

    if (!isOpen) return null;

    const suits = ['♠', '♣', '♥', '♦']; // Ejemplo de palos de naipes
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']; // Ejemplo de rangos
    const suitColors = {
        '♠': '#808080', // Gris plomo
        '♣': '#25C6A2', // Verde
        '♥': '#C62549', // Rojo
        '♦': '#5e4fff'  // Azul
    };

    const cardLimits = {
        holeCards: 2,
        flopCards: 3,
        turnCard: 1,
        riverCard: 1
    };

    const handleCardSelect = (card) => {
        if (selectedCards.length < cardLimits[cardSet] && !selectedCards.includes(card)) {
            const newSelectedCards = [...selectedCards, card];
            setSelectedCards(newSelectedCards);
            if (newSelectedCards.length === cardLimits[cardSet]) {
                onSelectCard(newSelectedCards);
            }
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {suits.map(suit => (
                    <div key={suit} style={{ display: 'flex', flexDirection: 'row' }}>
                        {ranks.map(rank => {
                            const card = rank + suit;
                            const isSelected = selectedCards.includes(card);
                            return (
                                <button
                                    className="button-card"
                                    key={card}
                                    onClick={(e) => {
                                        //console.log('Selecting card:', card);
                                        e.stopPropagation();  // Detener la propagación para evitar que otros manejadores de clics se activen
                                        handleCardSelect(card);
                                    }}
                                    style={{
                                        margin: '5px',
                                        backgroundColor: suitColors[suit],
                                        border: isSelected ? '2px solid black' : 'none'
                                    }}
                                >
                                    {card}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CardModal;
