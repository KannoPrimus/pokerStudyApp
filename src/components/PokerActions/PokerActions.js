import React, { useState, useEffect, useContext } from 'react';
import Slider from "react-slick";
import './PokerActions.css';
import { PokerHandContext } from '../PokerHandContext/PokerHandContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from 'react-modal'; // Asegúrate de instalar react-modal

library.add(fas);

const preflopFirstActions = ["OR_2.5bb", "OR_3bb", "ALL-IN"];
const postflopFirstActions = ["CHECK", "BET_10%", "BET_25%", "BET_33%", "BET_50%", "BET_60%", "BET_75%", "BET_100%", "BET_125%", "ALL-IN"];

const vsAggressiveActions = ["FOLD", "CALL", "RAISE_x3", "RAISE_x5", "ALL-IN"];
const vsPassiveActions = ["CHECK", "BET_10%", "BET_25%", "BET_33%", "BET_50%", "BET_60%", "BET_75%", "BET_100%", "BET_125%", "ALL-IN"];

Modal.setAppElement('#root'); // Reemplaza '#root' con el ID de tu elemento root

function PokerActions({ id }) {
    const { pokerHand, updatePokerHand, resetPokerHand } = useContext(PokerHandContext);
    const [selectedPlayer, setSelectedPlayer] = useState('');
    const [selectedAction, setSelectedAction] = useState('');
    const [previousAction, setPreviousAction] = useState('');
    const [actions, setActions] = useState([]);
    const [selectedActions, setSelectedActions] = useState({});
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [firstPlayer, setFirstPlayer] = useState('');
    const sliderRef = React.useRef(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false); // Estado para controlar el modal

    useEffect(() => {
        const phase = id.toLowerCase();

        if (pokerHand[`${phase}Action`] === "{}") {
            setActions([]);
            const inferredFirstPlayer = inferFirstPlayer();

            setFirstPlayer(inferredFirstPlayer);
            setActions([{ player: inferredFirstPlayer, action: 'NONE', order: 1, street: id, isCorrect: true, isOptional: false }]);
            updatePokerHand(`${id.toLowerCase()}Action`, "[{player="+ inferredFirstPlayer+", action=NONE, order=1, street="+id+", isCorrect=true, isOptional=false}]");
        } else {
            if (typeof pokerHand[`${phase}Action`] === "string") {
                const jsonString = pokerHand[`${phase}Action`]
                    .replace(/(\w+)=/g, '"$1":')
                    .replace(/ /g, "_")
                    .replace(/,_/g, ",")
                    .replace(/:"([^"]+?)"/g, (_, value) => {
                        if (value === 'true' || value === 'false' || !isNaN(value)) {
                            return `:${value}`;
                        }
                        return `:"${value}"`;
                    })
                    .replace(/:([^",{}\s]+)([,}])/g, ':\"$1\"$2');

                const cleanedJsonString = jsonString.replace(/:"(\w+ [^,{}]+)"/g, ':\"$1\"');
                const array = JSON.parse(cleanedJsonString);

                try {
                    setPreviousAction(array[0].action);
                } catch {
                    setPreviousAction('');
                }

                try {
                    setActions(array);
                } catch {
                    console.log("empty object");
                }
            }
        }
    }, [pokerHand[`${id.toLowerCase()}Action`], previousAction]);

    const isAggressiveAction = (action) => {
        return ["OR_2.5bb", "OR_3bb", "OR_4bb", "BET_10%", "BET_25%", "BET_33%", "BET_50%", "BET_60%", "BET_75%", "BET_100%", "BET_125%", "RAISE", "RAISE_x3", "RAISE_x5", "ALL-IN"].includes(action);
    };

    const getAvailableActions = (phase, previousAction, isFirstAction) => {
        if (isFirstAction) {
            return phase === "preflop" ? preflopFirstActions : postflopFirstActions;
        } else {
            return isAggressiveAction(previousAction) ? vsAggressiveActions : vsPassiveActions;
        }
    };

    const handleAddAction = (player, action) => {
        const newAction = {
            player: player,
            action: action,
            order: (actions.length + 1),
            street: id,
            isCorrect: true,
            isOptional: false
        };

        const newActions = [...actions, newAction];
        setActions(newActions);
        updatePokerHand(`${id.toLowerCase()}Action`, newActions);
    };

    const handleRemoveAction = (index) => {
        const newActions = actions.filter((_, i) => i !== index);
        setActions(newActions);
        updatePokerHand(`${id.toLowerCase()}Action`, newActions);
    };

    const handleToggleCorrect = (index) => {
        const newActions = actions.map((action, i) => {
            if (i === index && action.player === 'Hero') {
                return { ...action, isCorrect: !action.isCorrect };
            }
            return action;
        });
        setActions(newActions);
        updatePokerHand(`${id.toLowerCase()}Action`, newActions);
    };

    const handleSelectAction = (player, action, actionIndex) => {



        if (pokerHand.heroPosition === '9' || pokerHand.villainPosition === '9' || pokerHand.heroPosition === 9 || pokerHand.villainPosition === 9) {
            console.log(modalIsOpen);
            setModalIsOpen(true);
            return;
        }

        let updatedActions = actions.map((act, index) => {
            if (index === actionIndex) {
                return { ...act, action, player };
            }
            return act;
        });

        const previousAction = actionIndex > 0 ? updatedActions[actionIndex - 1].action : '';

        if (["CALL", "FOLD"].includes(action)) {
            updatedActions = updatedActions.slice(0, actionIndex + 1);
        } else if (!(previousAction === 'CHECK' && action === 'CHECK') && actionIndex === actions.length - 1 && !["CALL", "FOLD"].includes(action)) {
            const nextPlayer = inferPlayer(player);
            const newAction = { player: nextPlayer, action: 'NONE', order: updatedActions.length + 1, street: id, isCorrect: true, isOptional: false };
            updatedActions = [...updatedActions, newAction];
        }

        setActions(updatedActions);
        updatePokerHand(`${id.toLowerCase()}Action`, updatedActions);

        if (actionIndex > 1)
            sliderRef.current.slickNext();
    };

    const inferPlayer = (previousPlayer) => {
        return previousPlayer === "Hero" ? "Villain" : "Hero";
    };

    const inferFirstPlayer = () => {
        const positions = ["SB", "BB", "UTG", "MP", "CO", "BU"];
        const heroPositionIndex = pokerHand.heroPosition;
        const villainPositionIndex = pokerHand.villainPosition;

        if ((heroPositionIndex <= 1 && villainPositionIndex <= 1) || (heroPositionIndex > 1 && villainPositionIndex > 1)) {
            if (heroPositionIndex < villainPositionIndex) {
                return "Hero";
            } else {
                return "Villain";
            }
        }

        if ((heroPositionIndex <= 1 && villainPositionIndex > 1) || (heroPositionIndex > 1 && villainPositionIndex <= 1)) {
            const inPositionPlayer = heroPositionIndex > villainPositionIndex ? "Hero" : "Villain";
            const outOfPositionPlayer = inPositionPlayer === "Hero" ? "Villain" : "Hero";

            if (id.toLowerCase() === "preflop") {
                return inPositionPlayer;
            }

            return outOfPositionPlayer;
        }
    };

    const inferPostflopFirstPlayer = () => {
        const positions = ["SB", "BB", "UTG", "MP", "CO", "BU"];
        const heroPositionIndex = pokerHand.heroPosition;
        const villainPositionIndex = pokerHand.villainPosition;

        if (heroPositionIndex <= 1 && villainPositionIndex <= 1) {
            if (heroPositionIndex < villainPositionIndex) {
                return "Hero";
            } else {
                return "Villain";
            }
        }

        const inPositionPlayer = heroPositionIndex > villainPositionIndex ? "Hero" : "Villain";
        return inPositionPlayer;
    };

    useEffect(() => {
        if (actions.length === 0) {
            const inferredFirstPlayer = inferFirstPlayer();
            setFirstPlayer(inferredFirstPlayer);
            handleAddAction(inferredFirstPlayer, 'NONE');
        } else if (actions.length == 1 && ["CALL", "FOLD"].includes(actions[actions.length - 1].action)) {
            const nextStreet = getNextStreet(id);
            if (nextStreet) {
                const inferredFirstPlayer = nextStreet === "preflop" ? inferFirstPlayer() : inferPostflopFirstPlayer();
                updatePokerHand(`${nextStreet}Action`, "[{player="+ inferredFirstPlayer+", action=NONE, order=1, street="+nextStreet+", isCorrect=true, isOptional=false}]");
            }
        } else {
            const inferredFirstPlayer = inferFirstPlayer();
            setFirstPlayer(inferredFirstPlayer);
            const updatedActions = actions.map((action, index) => {
                const player = index === 0 ? inferFirstPlayer() : inferPlayer(actions[index - 1]?.player);
                return { ...action, player };
            });
            setActions(updatedActions);
        }
    }, [pokerHand.heroPosition, pokerHand.villainPosition]);

    useEffect(() => {
        if (pokerHand.heroPosition === 9 || pokerHand.villainPosition === 9) {
            const resetActions = () => {
                const inferredFirstPlayer = inferFirstPlayer();
                setFirstPlayer(inferredFirstPlayer);
                setActions([{ player: inferredFirstPlayer, action: 'NONE', order: 1, street: id, isCorrect: true, isOptional: false }]);
                updatePokerHand(`${id.toLowerCase()}Action`, "[{player="+ inferredFirstPlayer+", action=NONE, order=1, street="+id+", isCorrect=true, isOptional=false}]");
            };

            resetActions();
        }
    }, [pokerHand.heroPosition, pokerHand.villainPosition]);

    const getNextStreet = (currentStreet) => {
        const streets = ["preflop", "flop", "turn", "river"];
        const currentIndex = streets.indexOf(currentStreet.toLowerCase());
        return currentIndex !== -1 && currentIndex < streets.length - 1 ? streets[currentIndex + 1] : null;
    };

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: actions.length > 3,
        adaptiveHeight: false,
        centerMode: false,
    };

    return (
        <div className="poker-actions-container">
            <Slider {...settings} ref={sliderRef}>
                {actions.map((action, index) => (
                    <div key={index} className="ActionCard">
                        <div className="playerTag">{action.player || inferPlayer(actions[index - 1]?.player)} {index !== 0 && (
                            <button
                                className="remove-action-btn"
                                onClick={() => handleRemoveAction(index)}
                            >
                                &times;
                            </button>
                        )}</div>
                        <ul className="actions-list">
                            {getAvailableActions(id.toLowerCase(), index > 0 ? actions[index - 1].action : '', index === 0).map((actionOption, actionIndex) => (
                                <li
                                    key={`${action.order}-${actionIndex}`}
                                    className={action.action === actionOption ? 'selected' : ''}
                                    onClick={() => handleSelectAction(index === 0 ? firstPlayer : inferPlayer(actions[index - 1]?.player), actionOption, index)}
                                >
                                    {actionOption.replace(/_/g, ' ')}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </Slider>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Select Positions Warning"
                className="Modal"
                overlayClassName="Overlay"
            >
                <h2>Importante!</h2>
                <p>Primero se deben seleccionar las posiciones de los jugadores.</p>
                <button onClick={() => setModalIsOpen(false)}>Cerrar</button>
            </Modal>
        </div>
    );
}

export default PokerActions;
