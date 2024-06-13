import React, { useState, useEffect, useContext } from 'react';
import CardModal from '../CardModal/CardModal';
import './CardSelector.css'; // Importa el archivo CSS aquí
import { PokerHandContext } from '../PokerHandContext/PokerHandContext';
import { Image } from "@aws-amplify/ui-react";
import logo from "../../assets/logoPSA_2.png";

const suitColors = {
    '♠': '#808080', // Gris para Espadas
    '♣': '#25C6A2', // Verde para Tréboles
    '♥': '#C62549', // Rojo para Corazones
    '♦': '#5e4fff'  // Azul para Diamantes
};

function CardSelector({ card , trainer , currentHand}) {
    const [selectedCard, setSelectedCard] = useState('');
    const [cardSet, setCardSet] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { pokerHand, updatePokerHand } = useContext(PokerHandContext);

    useEffect(() => {
        // Initialize the component state with values from pokerHand
        switch (card) {
            case 'myHand_1':
                setSelectedCard(pokerHand.myHand_1);
                break;
            case 'myHand_2':
                setSelectedCard(pokerHand.myHand_2);
                break;
            case 'flopCards_1':
                setSelectedCard(pokerHand.flopCards_1);
                break;
            case 'flopCards_2':
                setSelectedCard(pokerHand.flopCards_2);
                break;
            case 'flopCards_3':
                setSelectedCard(pokerHand.flopCards_3);
                break;
            case 'turnCard':
                setSelectedCard(pokerHand.turnCard);
                break;
            case 'riverCard':
                setSelectedCard(pokerHand.riverCard);
                break;
            default:
                break;
        }
    }, [pokerHand, card]);

    const handleCardClick = () => {
        console.log(trainer);
        if(trainer === 'false') {
            switch (card) {
                case 'myHand_1':
                case 'myHand_2':
                    setCardSet('holeCards');
                    break;
                case 'flopCards_1':
                case 'flopCards_2':
                case 'flopCards_3':
                    setCardSet('flopCards');
                    break;
                case 'turnCard':
                    setCardSet('turnCard');
                    break;
                case 'riverCard':
                    setCardSet('riverCard');
                    break;
                default:
                    break;
            }
            setIsModalOpen(true);
        }
    };

    const handleCardSelect = (selectedCards) => {
        console.log(selectedCards);
        setIsModalOpen(false);

        if (cardSet === 'holeCards') {
            updatePokerHand('myHand_1', selectedCards[0] || '');
            updatePokerHand('myHand_2', selectedCards[1] || '');
        } else if (cardSet === 'flopCards') {
            updatePokerHand('flopCards_1', selectedCards[0] || '');
            updatePokerHand('flopCards_2', selectedCards[1] || '');
            updatePokerHand('flopCards_3', selectedCards[2] || '');
        } else if (cardSet === 'turnCard') {
            updatePokerHand('turnCard', selectedCards[0] || '');
        } else if (cardSet === 'riverCard') {
            updatePokerHand('riverCard', selectedCards[0] || '');
        }

        if (card === 'myHand_1' || card === 'myHand_2') {
            setSelectedCard(selectedCards[0] || '');
        } else if (card.startsWith('flopCards_')) {
            const flopIndex = parseInt(card.split('_')[1], 10) - 1;
            setSelectedCard(selectedCards[flopIndex] || '');
        } else if (card === 'turnCard') {
            setSelectedCard(selectedCards[0] || '');
        } else if (card === 'riverCard') {
            setSelectedCard(selectedCards[0] || '');
        }
    };

    const handleRightClick = (event) => {
        event.preventDefault(); // Prevenir el menú contextual predeterminado
        setSelectedCard(''); // Limpiar la selección de la carta
        switch (card) {
            case 'myHand_1':
                updatePokerHand('myHand_1', '');
                break;
            case 'myHand_2':
                updatePokerHand('myHand_2', '');
                break;
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
    };

    let cardClass = '';
    let logoSize='';

    // Determina el color basado en el último carácter del palo de la carta
    const backgroundColor = selectedCard ? suitColors[selectedCard.slice(-1)] : '#00ECB3';
    if (card === 'myHand_1' || card === 'myHand_2' || card === 'trainerCard') {
        cardClass = 'card-container-hero';
        logoSize='35px';
    } else {
        if(trainer === 'true') {
            cardClass = 'card-container-trainer';
            logoSize = '50px';
        } else {
            cardClass = 'card-container';
            logoSize = '50px';
        }
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={cardClass} onClick={handleCardClick} onContextMenu={handleRightClick} style={{ backgroundColor }}>
            {selectedCard || <span><Image src={logo} alt="Logo" width={logoSize} height={logoSize} opacity="0.2" /></span>}
            {isModalOpen && <CardModal isOpen={isModalOpen} onSelectCard={handleCardSelect} cardSet={cardSet} onClose={handleCloseModal}/>}
        </div>
    );
}

export default CardSelector;
