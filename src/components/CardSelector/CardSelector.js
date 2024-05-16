import React, { useState } from 'react';
import CardModal from '../CardModal/CardModal';
import './CardSelector.css'; // Importa el archivo CSS aquí

const suitColors = {
    '♠': '#808080', // Gris para Espadas
    '♣': '#008000', // Verde para Tréboles
    '♥': '#ff1405', // Rojo para Corazones
    '♦': '#5e4fff'  // Azul para Diamantes
};


function CardSelector() {
    const [selectedCard, setSelectedCard] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = () => {
        console.log('Opening modal');
        setIsModalOpen(true);
    };

    const handleCardSelect = (card) => {
        console.log('Card selected:', card);
        setSelectedCard(card);
        setIsModalOpen(false);
    };

    const handleRightClick = (event) => {
        event.preventDefault();  // Prevenir el menú contextual predeterminado
        setSelectedCard(null);  // Limpiar la selección de la carta
        console.log("Card selection cleared!");
    };

    // Determina el color basado en el último carácter del palo de la carta
    const backgroundColor = selectedCard ? suitColors[selectedCard.slice(-1)] : '#ff116e';

    return (

        <div className="card-container" onClick={handleCardClick} onContextMenu={handleRightClick}  style={{ backgroundColor }}>
            {selectedCard || <span>🂠</span>}
            {isModalOpen && <CardModal isOpen={isModalOpen}  onSelectCard={handleCardSelect} />}
        </div>

    );
}

export default CardSelector;
