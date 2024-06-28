import React, { useState, useEffect, useContext, useRef } from 'react';
import { Flex, Image, useTheme, View, Text } from "@aws-amplify/ui-react";
import './Topbar.css'; // Asegúrate de crear este archivo CSS
import { PokerHandContext } from '../PokerHandContext/PokerHandContext';
import logo2 from '../../assets/logoPSA_soloPica.png';
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
    const [confirmResetVisible, setConfirmResetVisible] = useState(false); // Estado para el modal de confirmación

    const dropdownRef = useRef(null);

    const playerPositions6Max = ['SB', 'BB','UTG', 'MP', 'CO', 'BU'];
    const playerPositions9Max = ['SB', 'BB','UTG', 'MP',  'MP2', 'MP3', 'HJ' , 'CO', 'BU'];

    useEffect(() => {
        updatePokerHand('playerId', user.username);
    }, []);

    useEffect(() => {
        if(mode==='Estudio')
            fetchPokerHands(user.username);
    }, [mode]);

    useEffect(() => {
        if (searchTerm) {
            setFilteredHands(pokerHandList.filter(hand =>
                hand.handTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                hand.description.toLowerCase().includes(searchTerm.toLowerCase())
            ));
            setDropdownVisible(true);
        } else {
            setFilteredHands([]);
            setDropdownVisible(false);
        }
    }, [searchTerm]);

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
        setConfirmResetVisible(true); // Mostrar el modal de confirmación
    };

    const handleConfirmReset = async (saveHand) => {
        if (saveHand) {
            await handleUpdateHand(); // Guardar la mano antes de recargar
        }
        window.location.reload();
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
                src={logo2}
            />
            <Text
                width="220px"
                fontSize="1rem" // Agrandar el tamaño de la fuente
                fontWeight="bold"
                color="white"
                fontStyle="italic"
                style={{
                    textShadow: '0px 0px 15px rgba(255, 255, 255, 1)', marginTop:'12px',paddingLeft:'25px' // Sombra inset
                }}
            >
                PokerCrushers.pro
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
                                        <div className="desciptionTopbarhand">{hand.description}</div>
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
                    {pokerHand?.id && pokerHand.playerId === user.username && (
                        <button className="nav-button" onClick={handleUpdateHand}>
                            <FontAwesomeIcon icon="floppy-disk" /> Guardar Mano
                        </button>
                    )}
                    {!pokerHand?.id && (
                        <button className="nav-button" onClick={handleCreateHand}>
                            <FontAwesomeIcon icon="floppy-disk" /> Guardar Mano
                        </button>
                    )}
                    {modalMessage && <div className={`modal ${isError ? 'error' : 'success'}`}>{modalMessage}</div>}
                </>
            )}

            {confirmResetVisible && (
                <>
                    <div className="modal-overlay"></div> {/* Superposición detrás del modal */}
                    <div className="modal-confirm">
                        <p>¿Desea guardar la mano antes de crear una nueva?</p>
                        <button onClick={() => handleConfirmReset(true)}>Sí</button>
                        <button onClick={() => handleConfirmReset(false)}>No</button>
                    </div>
                </>
            )}
        </div>
    );

}

export default TopBar;
