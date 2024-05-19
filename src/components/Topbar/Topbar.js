// En un nuevo archivo, por ejemplo TopBar.js
import React, { useState, useEffect, useContext , useRef} from 'react';
import './Topbar.css'; // Asegúrate de crear este archivo CSS
import { PokerHandContext } from '../PokerHandContext/PokerHandContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'; // Importa los estilos CSS necesarios
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useAuthenticator } from '@aws-amplify/ui-react';

function TopBar() {

    const { signOut, user } = useAuthenticator();
    const { pokerHand, createPokerHand,updatePokerHand } = useContext(PokerHandContext);

    console.log(user.username);
    useEffect(() => {
        updatePokerHand('playerId', user.username);
    }, []);


    return (
        <div className="top-bar">
            <input type="text" className="search-box" placeholder="Buscar manos..."/>
            <button className="nav-button" onClick={createPokerHand}><FontAwesomeIcon icon="floppy-disk" /> Guardar Mano</button>
        </div>
    );
}

export default TopBar;