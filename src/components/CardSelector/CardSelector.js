import React, { useState, useEffect, useContext } from 'react';
import CardModal from '../CardModal/CardModal';
import './CardSelector.css'; // Importa el archivo CSS aquí
import { PokerHandContext } from '../PokerHandContext/PokerHandContext';
import {Image} from "@aws-amplify/ui-react";
import logo from "../../assets/logoPSA_2.png";

const suitColors = {
    '♠': '#808080', // Gris para Espadas
    '♣': '#25C6A2', // Verde para Tréboles
    '♥': '#C62549', // Rojo para Corazones
    '♦': '#5e4fff'  // Azul para Diamantes
};

function CardSelector({ card , trainer , currentHand}) {
    const [selectedCard, setSelectedCard] = useState('');
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
        if(trainer==='false')
            setIsModalOpen(true);
    };

    const handleCardSelect = (selCard) => {
        setSelectedCard(selCard);
        setIsModalOpen(false);

        switch (card) {
            case 'myHand_1':
                updatePokerHand('myHand_1', selCard);
                break;
            case 'myHand_2':
                updatePokerHand('myHand_2', selCard);
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
    const backgroundColor = selectedCard ? suitColors[selectedCard.slice(-1)] : '#1639A1';
    if (card === 'myHand_1' || card === 'myHand_2' || card==='trainerCard') {
        cardClass = 'card-container-hero';
        logoSize='35px';
    } else {
        if(trainer==='true') {
            cardClass = 'card-container-trainer';
            logoSize = '50px';
        }
            else {
            cardClass = 'card-container';
            logoSize = '50px';
        }
    }

    return (
        <div className={cardClass} onClick={handleCardClick} onContextMenu={handleRightClick} style={{ backgroundColor }}>
            {selectedCard || <span><Image src={logo} alt="Logo" width={logoSize} height={logoSize} opacity="0.2" /></span>}
            {isModalOpen && <CardModal isOpen={isModalOpen} onSelectCard={handleCardSelect} />}
        </div>
    );
}

export default CardSelector;
