import React, { useState, useEffect, useContext, useRef } from 'react';
import { Flex, Image, useTheme, View, Text } from "@aws-amplify/ui-react";
import './Topbar.css'; // Asegúrate de crear este archivo CSS
import { PokerHandContext } from '../PokerHandContext/PokerHandContext';
import logo from '../../assets/logoPSA_2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Importa los estilos necesarios de FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Oval } from 'react-loader-spinner';

library.add(fas);

const suitColors = {
    '♠': '#808080', // Gris para Espadas
    '♣': '#25C6A2', // Verde para Tréboles
    '♥': '#C62549', // Rojo para Corazones
    '♦': '#5e4fff'  // Azul para Diamantes
};

function TopBar({ mode }) {
    const { signOut, user } = useAuthenticator();
    const { pokerHand, createPokerHandDB, updatePokerHandDB, updatePokerHand, pokerHandList, fetchPokerHands, setPokerHand } = useContext(PokerHandContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredHands, setFilteredHands] = useState([]);
    const [modalMessage, setModalMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const dropdownRef = useRef(null);

    const playerPositions6Max = ['UTG', 'MP', 'CO', 'BU', 'SB', 'BB'];
    const playerPositions9Max = ['UTG', 'MP', 'CO', 'BU', 'SB', 'BB', 'MP2', 'MP3', 'HJ'];

    useEffect(() => {
        updatePokerHand('playerId', user.username);
    }, []);

    useEffect(() => {
        fetchPokerHands(user.username);
    }, []);

    useEffect(() => {
        if (searchTerm) {
            setFilteredHands(pokerHandList.filter(hand => hand.handTitle.toLowerCase().includes(searchTerm.toLowerCase())));
            setDropdownVisible(true);
        } else {
            setFilteredHands([]);
            setDropdownVisible(false);
        }
    }, [searchTerm, pokerHandList]);

    const handleSelectHand = (hand) => {
        setSearchTerm('');
        setPokerHand(hand);
        setDropdownVisible(false);
    };

    const handleClickSearchBox = () => {
        setFilteredHands(pokerHandList);
        setDropdownVisible(true);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCreateHand = async () => {
        updatePokerHand('playerId', user.username);
        const response = await createPokerHandDB();
        if (!response.success) {
            setModalMessage(response.error);
            setIsError(true);
        } else {
            setModalMessage('Mano guardada con éxito!');
            setIsError(false);
        }
        setTimeout(() => {
            setModalMessage('');
            fetchPokerHands(user.username);
        }, 3000);
    };

    const handleUpdateHand = async () => {
        updatePokerHand('playerId', user.username);
        const response = await updatePokerHandDB();
        console.log(response.success);
        if (!response.success) {
            setModalMessage(response.error);
            setIsError(true);
        } else {
            setModalMessage('Mano guardada con éxito!');
            setIsError(false);
        }
        setTimeout(() => {
            setModalMessage('');
            fetchPokerHands(user.username);
        }, 3000);
    };

    const getSuitColor = (card) => {
        if (!card) return '#000'; // Color por defecto si la carta es nula o indefinida
        const suit = card.slice(-1);
        return suitColors[suit] || '#000';
    };

    const handleResetHand = () => {
        window.location.reload();
        setShowLoader(true);
        setTimeout(() => {}, 5000);
    };

    const getPositionText = (index, tableType) => {
        if (tableType === '6') {
            return playerPositions6Max[index] || '';
        } else if (tableType === '9') {
            return playerPositions9Max[index] || '';
        }
        return '';
    };

    return (
        <div className="top-bar" ref={dropdownRef}>
            {showLoader && (
                <div className="overlay">
                    <Oval
                        height={100}
                        width={100}
                        color="#4fa94d"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="#4fa94d"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                    />
                </div>
            )}

            <Image
                height="50px"
                alt="Poker Study App Logo"
                src={logo}
            />
            <Text
                width="220px"
                fontSize="2rem" // Agrandar el tamaño de la fuente
                fontWeight="bold"
                color="white"
                style={{
                    textShadow: '0px 0px 5px rgba(0, 0, 0, 1)' // Sombra inset
                }}
            >
                PSA
            </Text>

            {mode === "Estudio" && (
                <>
                    {pokerHand?.id && (
                        <button className="nav-button" onClick={handleResetHand}>
                            <FontAwesomeIcon icon="sync" /> Nueva Mano
                        </button>
                    )}

                    <input
                        type="text"
                        className="search-box"
                        placeholder="Click aquí para listar tus manos o escribe para filtrar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setDropdownVisible(true)}
                        onClick={handleClickSearchBox}
                    />
                    {dropdownVisible && filteredHands.length > 0 && (
                        <ul className="dropdown-menu">
                            {filteredHands.map((hand) => (
                                <li key={hand.id} onClick={() => handleSelectHand(hand)}>
                                    <div className="hand-title">{hand.handTitle}
                                        <div className="player-positions">
                                            {getPositionText(hand.heroPosition, hand.tableType)} vs {getPositionText(hand.villainPosition, hand.tableType)}
                                        </div>
                                        <div className="player-positions">
                                            {hand.tableType} max
                                        </div>
                                    </div>
                                    <div className="hand-details">
                                        <div className="hand-cards">
                                            <strong>Player's Hand:</strong>
                                            <div className="card" style={{ color: getSuitColor(hand.myHand_1) }}>{hand.myHand_1}</div>
                                            <div className="card" style={{ color: getSuitColor(hand.myHand_2) }}>{hand.myHand_2}</div>
                                        </div>
                                        <div className="flop-turn-river">
                                            <div className="hand-cards">
                                                <strong>Flop:</strong>
                                                <div className="card" style={{ color: getSuitColor(hand.flopCards_1) }}>{hand.flopCards_1}</div>
                                                <div className="card" style={{ color: getSuitColor(hand.flopCards_2) }}>{hand.flopCards_2}</div>
                                                <div className="card" style={{ color: getSuitColor(hand.flopCards_3) }}>{hand.flopCards_3}</div>
                                            </div>
                                            <div className="hand-cards">
                                                <strong>Turn:</strong>
                                                <div className="card" style={{ color: getSuitColor(hand.turnCard) }}>{hand.turnCard}</div>
                                            </div>
                                            <div className="hand-cards">
                                                <strong>River:</strong>
                                                <div className="card" style={{ color: getSuitColor(hand.riverCard) }}>{hand.riverCard}</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    {pokerHand?.id ? (
                        <button className="nav-button" onClick={handleUpdateHand}>
                            <FontAwesomeIcon icon="floppy-disk" /> Guardar Mano
                        </button>
                    ) : (
                        <button className="nav-button" onClick={handleCreateHand}>
                            <FontAwesomeIcon icon="floppy-disk" /> Guardar Mano
                        </button>
                    )}
                    {modalMessage && <div className={`modal ${isError ? 'error' : 'success'}`}>{modalMessage}</div>}
                </>
            )}
        </div>
    );
}

export default TopBar;
