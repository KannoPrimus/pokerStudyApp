import React, { useState, useEffect, useContext } from 'react';
import './PokerRanges.css';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { PokerHandContext } from '../PokerHandContext/PokerHandContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import CardMatrix from '../CardMatrix/CardMatrix';
import {createRanges, updateRanges, deleteRanges, createTrainings} from "../../graphql/mutations";
import { generateClient } from "aws-amplify/api";
import {listRanges} from "../../graphql/queries";
library.add(fas);

const client = generateClient();

function PokerRanges() {
    const { pokerHand } = useContext(PokerHandContext);
    const { user, signOut } = useAuthenticator();

    const [ranges, setRanges] = useState([]);
    const [rangeFromChild, setRangeFromChild] = useState('');
    const [rangeIdFromChild, setRangeIdFromChild] = useState('');

    const handleValueChange = (newValue,rangeId) => {
        setRangeFromChild(newValue);  // Aquí recibimos el valor desde el hijo
        setRangeIdFromChild(rangeId);
    };

    const addRange = () => {
        const newRange = {
            id: Date.now(),
            title: `Nuevo Rango`,
            range: '{}',
            selectedColorCode: null, // Nuevo campo para almacenar el color seleccionado
            colors: [
                { code: 1 , color: '#16974b', description: 'Raise' },
                { code: 2 , color: '#ffd60d', description: 'Call' },
                { code: 3 , color: '#ff116e', description: 'Fold' },
                { code: 4 , color: '#4682B4', description: 'OR' },
                { code: 5 , color: '#818280', description: 'Limp' }
            ]
        };
        setRanges(prevRanges => [...prevRanges, newRange]);

        try {

            const createRange = async (rangeId, playerId, title, range,colors) => {
                const newTraining = await client.graphql({
                    query: createRanges,
                    variables: {
                        input: {
                            "rangeId": rangeId,
                            "palyerId": playerId,
                            "title": title,
                            "range": range,
                            "colors": JSON.stringify(colors),

                        }
                    }
                });
            };

            //console.log('Save training',currentHand.id + ' ' + user.username+ ' ' + scorePercentage);
            createRange(newRange.id ,user.username, newRange.title,newRange.range,newRange.colors);



        } catch (error) {
            console.error('Error creating range:', error);
        }


    };

    const removeRange = (id) => {

        setRanges(prevRanges => prevRanges.filter(range => range.id !== id));
        try {

            const removeRange = async (rangeId, playerId) => {
                const newTraining = await client.graphql({
                    query: deleteRanges,
                    variables: {
                        input: {
                            "id":rangeId,

                        }
                    }
                });
            };

            //console.log('Save training',currentHand.id + ' ' + user.username+ ' ' + scorePercentage);
            removeRange(id ,user.username);



        } catch (error) {
            console.error('Error creating range:', error);
        }
    };

    const updateRange = (id, newRange) => {
        setRanges(prevRanges =>
            prevRanges.map(range =>
                range.id === id ? { ...range, range: newRange } : range
            )
        );
    };

    const updateRangeTitle = (id, newTitle) => {
        setRanges(prevRanges =>
            prevRanges.map(range =>
                range.id === id ? { ...range, title: newTitle } : range
            )
        );
    };

    const updateColorDescription = (rangeId, colorIndex, newDescription) => {
        setRanges(prevRanges =>
            prevRanges.map(range =>
                range.id === rangeId
                    ? {
                        ...range,
                        colors: range.colors.map((color, index) =>
                            index === colorIndex
                                ? { ...color, description: newDescription }
                                : color
                        )
                    }
                    : range
            )
        );
    };

    const selectColor = (rangeId, colorCode) => {
        setRanges(prevRanges =>
            prevRanges.map(range =>
                range.id === rangeId ? { ...range, selectedColorCode: colorCode } : range
            )
        );
    };

    const saveRange = (id) => {
        const rangeToSave = ranges.find(range => range.id === id);
        console.log('Guardando rango:', rangeToSave);
        // Aquí puedes agregar la lógica para guardar el rango, por ejemplo, enviándolo a una API o actualizando el estado global

        try {
            const updateRange = async (id, playerId) => {
                const newMembers = await client.graphql({
                    query: updateRanges,
                    variables: {
                        input: {
                            "id":id,
                            "rangeId": rangeToSave.rangeId,
                            "palyerId": rangeToSave.playerId,
                            "title": rangeToSave.title,
                            "range": rangeToSave.range,
                            "colors": JSON.stringify(rangeToSave.colors),

                        }
                    }
                });
            };

            updateRange(id, user.username);
        } catch {
            console.log('Error updating');
        }
    };

    const grid = [];
    for (let i = 0; i < ranges.length; i += 3) {
        grid.push(ranges.slice(i, i + 3));
    }

    useEffect(() => {
        // Aquí podrías cargar datos desde una API si es necesario

        updateRange(rangeIdFromChild,rangeFromChild);


    }, [rangeFromChild]);

    useEffect(() => {
        // Aquí podrías cargar datos desde una API si es necesario


        const fetchRanges = async (playerId=null) => {
            try {
                const filter = {  };

                if (playerId) {
                    filter.palyerId = { eq: playerId };
                }


                const result = await client.graphql({
                    query: listRanges,
                    variables: { filter }
                });

                // Accede al array de items que viene en la respuesta
                const fetchedRanges = result.data.listRanges.items;

                console.log(result);

                const transformedRanges = fetchedRanges.map(range => ({
                    ...range,
                    colors: JSON.parse(range.colors)  // Si 'colors' viene como string JSON desde el backend
                }));

                setRanges(transformedRanges);


            } catch (error) {
                console.log(error);
            }
        };

        fetchRanges(user.username);

    }, []);

    return (
        <div className="ranges-grid-container">
            <div className="ranges-grid-instructions">
            <button onClick={addRange}><FontAwesomeIcon icon="plus" size="1x" /> Agregar Rango</button>
                <div>
                    Instrucciones:
                    <p>Puedes editar el titulo de cada rango y la glosa de cada etiqueta para acomodarlas a tus necesidades haciendo click sobre el texto.</p>
                    <p>Para dibujar los rangos puedes hacer click en una celda y esta cambiará de color. Varios clicks hacen que la celda cambie a los distintos colores de cada etiqueta.</p>
                    <p>Para dibujar los rangos más rápido haz click derecho sobre una celda y mantén apretado el botón, luego arrastra el mouse para cambiar el color de las celdas.</p>
                </div>
            </div>
            <div className="ranges-grid">
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="ranges-row">
                        {row.map((rangeItem, colIndex) => (
                            <div key={colIndex} className="ranges-cell">
                                <div className="range-buttons">
                                    <input
                                        type="text"
                                        className="range-title-input"
                                        value={rangeItem.title}
                                        onChange={(e) => updateRangeTitle(rangeItem.id, e.target.value)}
                                    />
                                    <button
                                        className="save-button"
                                        onClick={() => saveRange(rangeItem.id)}
                                    >
                                        <FontAwesomeIcon icon="floppy-disk" size="1x" />
                                    </button>
                                    <button
                                        className="remove-button"
                                        onClick={() => removeRange(rangeItem.id)}
                                    >
                                        <FontAwesomeIcon icon="square-xmark" size="1x" />
                                    </button>
                                </div>
                                <CardMatrix rangeId={rangeItem.id} range={rangeItem.range} onValueChange={handleValueChange}/>
                                <div className="color-tags">
                                    {rangeItem.colors.map((colorItem, index) => (
                                        <div key={index} className="color-tag-container">
                                            <span
                                                className={`color-tag ${rangeItem.selectedColorCode === colorItem.code ? 'selected' : ''}`}
                                                style={{ backgroundColor: colorItem.color }}
                                            ></span>
                                            <input
                                                type="text"
                                                className="color-description-input"
                                                value={colorItem.description}
                                                onChange={(e) =>
                                                    updateColorDescription(rangeItem.id, index, e.target.value)
                                                }
                                            />

                                        </div>
                                    ))}
                                </div>

                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PokerRanges;
