// Modificado en App.js
import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import { Login } from './components/Login/Login';
import MainContent from './components/MainContent/MainContent';
import Topbar from './components/Topbar/Topbar'; // Asegúrate de importar correctamente
import PokerTrainer from './components/PokerTrainer/PokerTrainer';
import PokerStats from './components/PokerStats/PokerStats';
import './App.css';
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/api";
import { listMembers, getMembers, listHands as listHandsQuery } from "./graphql/queries";
import { createMembers, updateMembers } from "./graphql/mutations";
import { isBefore, parseISO } from "date-fns";
import Tutorial from './components/About/Tutorial';

const client = generateClient();

function App() {
    const { signOut, user } = useAuthenticator();
    const [mode, setMode] = useState('Estudio'); // State for mode
    const [sequence, setSequence] = useState('');
    const [handTitle, setHandTitle] = useState(''); // State for handTitle
    const [hasMembership, setHasMembership] = useState(false); // State for membership status
    const [endDateMembership, setEndDateMembership] = useState('');
    const [loading, setLoading] = useState(true); // State for loading
    const [membership, setMembership] = useState('');
    const [stake, setStake] = useState('');

    useEffect(() => {
        const fetchMembership = async (playerId) => {
            try {
                const result = await client.graphql({
                    query: getMembers,
                    variables: { id: playerId }
                });

                const userMembership = result.data.getMembers;
                if (userMembership) {
                    setHasMembership(true);
                    setEndDateMembership(userMembership.endDate);
                } else {
                    const createBasicMembership = async (playerId) => {
                        const newMembers = await client.graphql({
                            query: createMembers,
                            variables: {
                                input: {
                                    "id": playerId,
                                    "playerId": playerId,
                                    "memberPlan": "BASIC",
                                    "endDate": "9999-01-01Z"
                                }
                            }
                        });
                    };

                    createBasicMembership(user.username);
                    setMembership('BASIC');
                }

                setMembership(userMembership.memberPlan);
            } catch (error) {
                console.error('Error fetching membership:', error);
                setLoading(false);
            }
        };

        if (user) {
            fetchMembership(user.username);
        } else {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (membership !== '') {
            setLoading(false);

            const endDateParsed = parseISO(endDateMembership);

            // Obtener la fecha actual
            const today = new Date();

            // Comparar las fechas
            if (isBefore(endDateParsed, today)) {
                try {
                    const updateMembership = async (playerId) => {
                        const newMembers = await client.graphql({
                            query: updateMembers,
                            variables: {
                                input: {
                                    "id": playerId,
                                    "playerId": playerId,
                                    "memberPlan": "BASIC",
                                    "endDate": "9999-01-01z"
                                }
                            }
                        });
                    };

                    updateMembership(user.username);
                } catch {
                    console.log('Error updating');
                }
            } else {
                console.log("endDate es mayor o igual que hoy");
            }
        }
    }, [membership]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p className="loading-text">Loading...</p>
            </div>
        );
    }

    if (!user) {
        return <Login />;
    }

    if (membership !== '') {
        return (
            <div className="App">
                <Topbar mode={mode} />
                <div className="content">
                    <Sidebar
                        mode={mode}
                        setMode={setMode}
                        sequence={sequence}
                        setSequence={setSequence}
                        membership={membership}
                        stake={stake}
                        setStake={setStake}
                    />
                    {(() => {
                        switch (mode) {
                            case 'Estudio':
                                return <MainContent membership={membership} />;
                            case 'Trainer':
                                return <PokerTrainer sequence={sequence} stake={stake} membership={membership} />;
                            case 'Estadisticas':
                                return <PokerStats />;
                            default:
                                return null;
                        }
                    })()}
                </div>
            </div>
        );
    }
}

export default App;
