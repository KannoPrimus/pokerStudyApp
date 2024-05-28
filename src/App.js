// Modificado en App.js

import React, { useEffect , useState}  from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import {Login}  from './components/Login/Login';
import MainContent from './components/MainContent/MainContent';
import Topbar from './components/Topbar/Topbar'; // Asegúrate de importar correctamente
import PokerTrainer from './components/PokerTrainer/PokerTrainer';
import './App.css';
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from '@aws-amplify/ui-react';

function App() {

        const {signOut, user} = useAuthenticator();
        const [mode, setMode] = useState('Estudio'); // State for mode
        const [sequence, setSequence] = useState('');
        const [handTitle, setHandTitle] = useState(''); // State for handTitle


        if (user) {


            return (
                <div className="App">
                    <Topbar mode={mode}/>
                    <div className="content">
                        <Sidebar
                            mode={mode}
                            setMode={setMode}
                            sequence={sequence}
                            setSequence={setSequence}
                        />
                        {mode === 'Estudio' ? <MainContent /> : <PokerTrainer sequence={sequence} />}

                    </div>

                </div>
            );
        }
    return <Login/>
}

export default App;

