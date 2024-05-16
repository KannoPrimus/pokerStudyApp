// En un nuevo archivo, por ejemplo TopBar.js
import React from 'react';
import './Topbar.css'; // Asegúrate de crear este archivo CSS

function TopBar() {
    return (
        <div className="top-bar">
            <button className="nav-button">Mano Anterior</button>
            <input type="text" className="search-box" placeholder="Buscar manos..."/>
            <button className="nav-button">Mano Siguiente</button>
        </div>
    );
}

export default TopBar;