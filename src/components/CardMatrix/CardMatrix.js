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

    let initialMatrix = () => Array(clickCounts.length).fill().map(() => Array(clickCounts[0].length).fill(0));
    const [clickCounts, setClickCounts] = useState(
        Array(ranks.length).fill(null).map(() => Array(ranks.length).fill(0))
    );
    const [isDragging, setIsDragging] = useState(false);
    const [dragColor, setDragColor] = useState(null);  // Nuevo estado para almacenar el color durante el arrastre
    const { pokerHand, updatePokerHand } = useContext(PokerHandContext);

    useEffect(() => {



            if (myRange == 'true') {



                switch (id) {
                    case 'Preflop':
                        if(pokerHand.preflopHeroRange!="{}" ) {

                            setClickCounts(JSON.parse(pokerHand.preflopHeroRange));
                        }else setClickCounts(initialMatrix());
                        break;
                    case 'Flop':
                        if(pokerHand.flopHeroRange!="{}") {

                            setClickCounts(JSON.parse(pokerHand.flopHeroRange));
                        }else setClickCounts(initialMatrix());
                        break;
                    case 'Turn':
                        if(pokerHand.turnHeroRange!="{}") {

                            setClickCounts(JSON.parse(pokerHand.turnHeroRange));
                        }else setClickCounts(initialMatrix());
                        break;
                    case 'River':
                        if(pokerHand.riverHeroRange!="{}") {

                            setClickCounts(JSON.parse(pokerHand.riverHeroRange));
                        }else setClickCounts(initialMatrix());
                        break;
                    default:
                        break;
                }
            }
            else {

                switch (id) {
                    case 'Preflop':
                        if(pokerHand.preflopVillainRange!="{}") {

                            setClickCounts(JSON.parse(pokerHand.preflopVillainRange));
                        }else setClickCounts(initialMatrix());
                        break;
                    case 'Flop':
                        if(pokerHand.flopVillainRange!="{}") {

                            setClickCounts(JSON.parse(pokerHand.flopVillainRange));
                        }else setClickCounts(initialMatrix());
                        break;
                    case 'Turn':
                        if(pokerHand.turnVillainRange!="{}") {

                            setClickCounts(JSON.parse(pokerHand.turnVillainRange));
                        }else setClickCounts(initialMatrix());
                        break;
                    case 'River':
                        if(pokerHand.riverVillainRange!="{}") {

                            setClickCounts(JSON.parse(pokerHand.riverVillainRange));
                        }else setClickCounts(initialMatrix());
                        break;
                    default:
                        break;
                }
            }


    }, [pokerHand]);


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

        if(myRange=='true'){

            switch(id) {
                case 'Preflop':
                    updatePokerHand('preflopHeroRange', JSON.stringify(clickCounts));
                    break;
                case 'Flop':
                        updatePokerHand('flopHeroRange', JSON.stringify(clickCounts));
                    break;
                case 'Turn':
                        updatePokerHand('turnHeroRange', JSON.stringify(clickCounts));
                    break;
                case 'River':
                        updatePokerHand('riverHeroRange', JSON.stringify(clickCounts));
                    break;
                default:
                    break;
            }
        }
        else{

            switch(id) {
                case 'Preflop':
                    updatePokerHand('preflopVillainRange', JSON.stringify(clickCounts));
                    break;
                case 'Flop':
                    updatePokerHand('flopVillainRange', JSON.stringify(clickCounts));
                    break;
                case 'Turn':
                    updatePokerHand('turnVillainRange', JSON.stringify(clickCounts));
                    break;
                case 'River':
                    updatePokerHand('riverVillainRange', JSON.stringify(clickCounts));
                    break;
                default:
                    break;
            }
        }



    };


    const handleClick = (i, j) => {
        const color = getNextColor(clickCounts[i][j]);
        setDragColorForCell(i, j, color);

    };

    const handleClear = () => {


        setClickCounts(initialMatrix());

        if(myRange=='true'){

            switch(id) {
                case 'Preflop':
                    updatePokerHand('preflopHeroRange', "{}");
                    break;
                case 'Flop':
                    updatePokerHand('flopHeroRange', "{}");
                    break;
                case 'Turn':
                    updatePokerHand('turnHeroRange', "{}");
                    break;
                case 'River':
                    updatePokerHand('riverHeroRange', "{}");
                    break;
                default:
                    break;
            }
        }
        else{

            switch(id) {
                case 'Preflop':
                    updatePokerHand('preflopVillainRange', "{}");
                    break;
                case 'Flop':
                    updatePokerHand('flopVillainRange', "{}");
                    break;
                case 'Turn':
                    updatePokerHand('turnVillainRange', "{}");
                    break;
                case 'River':
                    updatePokerHand('riverVillainRange', "{}");
                    break;
                default:
                    break;
            }
        }
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

            case 1: return '#16974b';
            case 2: return '#ffd60d';
            case 3: return '#ff116e';
            case 4: return '#818280';
            default: return 'transparent';
        }
    };

    return (

        <div className="card-matrix" onMouseUp={handleMouseUp} onContextMenu={(e) => e.preventDefault()} >
            <button className="button-clear-matrix" onClick={handleClear} title="Limpiar Matriz">
                <FontAwesomeIcon icon="eraser" />
            </button>
            <div className="tooltip-matrix">
            {ranks.map((rank1, i) => (
                <div key={i} className="row">
                    {ranks.map((rank2, j) => (
                        <div  key={j} className="cell" style={{ backgroundColor: getColor(clickCounts[i][j]) }}
                             onMouseDown={(e) => handleMouseDown(i, j, e)}
                             onMouseEnter={() => handleMouseEnter(i, j)}>
                            {rank1 + rank2}
                        </div>
                    ))}
                </div>
            ))}
                <span className="tooltip-text"><h5>Tips:</h5><div>Click en celda para colorear.</div><div>  Multiples clicks para cambiar de color. </div><div>  Mantener botón derecho para colorear una zona.</div>  </span>

            </div>
        </div>
    );
}

export default CardMatrix;
