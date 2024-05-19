import React, { useState, useEffect, useContext , useRef} from 'react';
import CardModal from '../CardModal/CardModal';
import './CardSelector.css'; // Importa el archivo CSS aquí
import { PokerHandContext } from '../PokerHandContext/PokerHandContext';

const suitColors = {
    '♠': '#808080', // Gris para Espadas
    '♣': '#008000', // Verde para Tréboles
    '♥': '#ff1405', // Rojo para Corazones
    '♦': '#5e4fff'  // Azul para Diamantes
};


function CardSelector(card) {
    const [selectedCard, setSelectedCard] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { pokerHand, updatePokerHand } = useContext(PokerHandContext);

   useEffect(() => {

        switch(card['card']) {
            case 'myHand_1':
                updatePokerHand('myHand_1', selectedCard);
                break;
            case 'myHand_2':
                updatePokerHand('myHand_2', selectedCard);
                break;
            case 'flopCards_1':
                updatePokerHand('flopCards_1', selectedCard);
                break;
            case 'flopCards_2':
                updatePokerHand('flopCards_2', selectedCard);
                break;
            case 'flopCards_3':
                updatePokerHand('flopCards_3', selectedCard);
                break;
            case 'turnCard':
                updatePokerHand('turnCard', selectedCard);
                break;
            case 'riverCard':
                updatePokerHand('riverCard', selectedCard);
                break;
            default:
                break;
        }


    }, [selectedCard]);

    const handleCardClick = () => {
        console.log('Opening modal');
        setIsModalOpen(true);
    };

    const handleCardSelect = (selCard) => {
        console.log('Card selected:', selCard);
        console.log('Card:', card);
        setSelectedCard(selCard);
        setIsModalOpen(false);

        switch(card['card']) {
            case 'myHand_1':
                updatePokerHand('myHand_1', selectedCard);
                break;
            case 'myHand_2':
                updatePokerHand('myHand_2', selectedCard);
                break;
            case 'flopCards_1':
                updatePokerHand('flopCards_1', selCard);
                break;
            case 'flopCards_2':
                updatePokerHand('flopCards_2', selCard);
                break;
            case 'flopCards_3':
                updatePokerHand('flopCards_3', selCard);
                break;
            case 'turnCard':
                updatePokerHand('turnCard', selCard);
                break;
            case 'riverCard':
                updatePokerHand('riverCard', selCard);
                break;
            default:
                break;
        }

    };

    const handleRightClick = (event) => {
        event.preventDefault();  // Prevenir el menú contextual predeterminado
        setSelectedCard(null);  // Limpiar la selección de la carta
        switch(card['card']) {
            case 'flopCards_1':
                updatePokerHand('flopCards_1', '');
                break;
            case 'flopCards_2':
                updatePokerHand('flopCards_2', '');
                break;
            case 'flopCards_3':
                updatePokerHand('flopCards_3', '');
                break;
            case 'turnCard':
                updatePokerHand('turnCard', '');
                break;
            case 'riverCard':
                updatePokerHand('riverCard', '');
                break;
            default:
                break;
        }
        console.log("Card selection cleared!");
    };

    let cardClass =''

    // Determina el color basado en el último carácter del palo de la carta
    const backgroundColor = selectedCard ? suitColors[selectedCard.slice(-1)] : '#ff116e';
    if(card['card']=='myHand_1' || card['card']=='myHand_2' ) {
            cardClass = 'card-container-hero';
        }
        else{
            cardClass = 'card-container';
        }

    return (

        <div className={cardClass} onClick={handleCardClick} onContextMenu={handleRightClick}  style={{ backgroundColor }}>
            {selectedCard || <span>🂠</span>}
            {isModalOpen && <CardModal isOpen={isModalOpen}  onSelectCard={handleCardSelect} />}
        </div>

    );
}

export default CardSelector;
