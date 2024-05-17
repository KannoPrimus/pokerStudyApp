import React, { useState, useEffect, useContext , useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'; // Importa los estilos CSS necesarios
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import './CardMatrix.css';
import { PokerHandContext } from '../PokerHandContext/PokerHandContext';

library.add(fas);
const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

function CardMatrix({id,myRange,rangeState, setRangeState}) {

    const initialMatrix = () => Array(clickCounts.length).fill().map(() => Array(clickCounts[0].length).fill(0));
    const [clickCounts, setClickCounts] = useState(
        Array(ranks.length).fill(null).map(() => Array(ranks.length).fill(0))
    );
    const [isDragging, setIsDragging] = useState(false);
    const [dragColor, setDragColor] = useState(null);  // Nuevo estado para almacenar el color durante el arrastre
    const { pokerHand, updatePokerHand } = useContext(PokerHandContext);


    const handleMouseDown = (i, j, event) => {
        if (event.button === 0) { // Botón izquierdo
            handleClick(i, j);
        } else if (event.button === 2) { // Botón derecho
            setIsDragging(true);
            setDragColor(getNextColor(clickCounts[i][j])); // Establece el color para todo el arrastre
        }
    };

    const handleMouseEnter = (i, j) => {
        if (isDragging) {
            setDragColorForCell(i, j, dragColor); // Aplica el color de arrastre a la celda
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setDragColor(null);  // Restablece el color de arrastre

        switch(id) {
            case 'Preflop':
                if(myRange='true'){
                    updatePokerHand('preflopHeroRange', clickCounts);
                }
                else{
                    updatePokerHand('preflopVillainRange', clickCounts);
                }
                break;
            case 'Flop':
                if(myRange='true'){
                    updatePokerHand('flopHeroRange', clickCounts);
                }
                else{
                    updatePokerHand('flopVillainRange', clickCounts);
                }
                break;
            case 'Turn':
                if(myRange=='true'){
                    updatePokerHand('turnHeroRange', clickCounts);
                }
                else{
                    updatePokerHand('turnVillainRange', clickCounts);
                }
                break;
            case 'River':
                if(myRange='true'){
                    updatePokerHand('riverHeroRange', clickCounts);
                }
                else{
                    updatePokerHand('riverVillainRange', clickCounts);
                }
                break;
            default:
                break;
        }

    };

    const handleClick = (i, j) => {
        const color = getNextColor(clickCounts[i][j]);
        setDragColorForCell(i, j, color);

    };

    const handleClear = () => {
        setClickCounts(initialMatrix());
    };

    const handleSave = () => {
        updatePokerHand('preflopHeroRange', clickCounts);
    };

    const setDragColorForCell = (i, j, color) => {
        const newCounts = clickCounts.map((row, rowIndex) =>
            row.map((count, colIndex) => {
                if (i === rowIndex && j === colIndex) {
                    return color;
                }
                return count;
            })
        );
        setClickCounts(newCounts);
    };

    const getNextColor = (currentCount) => {
        return (currentCount + 1) % 5; // Ciclar entre 4 estados
    };

    const getColor = (count) => {
        switch (count) {

            case 1: return '#99ff99';
            case 2: return '#ffff99';
            case 3: return '#ff9999';
            case 4: return '#818280';
            default: return 'transparent';
        }
    };

    return (

        <div className="card-matrix" onMouseUp={handleMouseUp} onContextMenu={(e) => e.preventDefault()}>
            <button className="button-clear-matrix" onClick={handleClear} title="Limpiar Matriz">
                <FontAwesomeIcon icon="eraser" />
            </button>
            <button className="button-clear-matrix" onClick={handleSave} title="Guardar Matriz">
            <FontAwesomeIcon icon="floppy-disk" />
        </button>
            {ranks.map((rank1, i) => (
                <div key={i} className="row">
                    {ranks.map((rank2, j) => (
                        <div key={j} className="cell" style={{ backgroundColor: getColor(clickCounts[i][j]) }}
                             onMouseDown={(e) => handleMouseDown(i, j, e)}
                             onMouseEnter={() => handleMouseEnter(i, j)}>
                            {rank1 + rank2}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default CardMatrix;
