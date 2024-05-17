// Modificado en App.js

import React, { useEffect }  from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import {Login}  from './components/Login/Login';
import MainContent from './components/MainContent/MainContent';
import Topbar from './components/Topbar/Topbar'; // Asegúrate de importar correctamente
import './App.css';
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from '@aws-amplify/ui-react';

function App() {

        const {signOut, user} = useAuthenticator();

        if (user) {


            return (
                <div className="App">
                    <Topbar/>
                    <div className="content">
                        <Sidebar/>
                        <MainContent/>
                    </div>

                </div>
            );
        }
    return <Login/>
}

export default App;

