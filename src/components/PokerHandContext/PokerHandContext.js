import React, { createContext, useState } from 'react';

export const PokerHandContext = createContext();

export const PokerHandProvider = ({ children }) => {
    const [pokerHand, setPokerHand] = useState({
        id: '',
        playerId: '',
        tableType: '',
        handTags: [], // Asegúrate de que esto sea un array vacío
        heroPosition: '',
        handTitle: '',
        preflopNotes: '',
        preflopHeroRange: '{}',
        preflopVillainRange: '{}',
        flopNotes: '',
        flopHeroRange: '{}',
        flopVillainRange: '{}',
        turnNotes: '',
        turnHeroRange: '{}',
        turnVillainRange: '{}',
        riverNotes: '',
        riverHeroRange: '{}',
        riverVillainRange: '{}',
        flopCards_1: '{}',
        flopCards_2: '{}',
        flopCards_3: '{}',
        turnCard: '{}',
        riverCard: '{}',
        villainPosition: ''
    });

    const updatePokerHand = (key, value) => {
        setPokerHand(prevState => ({
            ...prevState,
            [key]: value,
        }));

        console.log({pokerHand});
    };

    return (
        <PokerHandContext.Provider value={{ pokerHand, updatePokerHand }}>
            {children}
        </PokerHandContext.Provider>
    );
};
