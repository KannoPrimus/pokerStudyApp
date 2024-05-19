import React, { createContext, useState } from 'react';
import { generateClient } from "aws-amplify/api";

import {
    createHands as createHandMutation,
    updateHands as updatehandMutation,
} from "../../graphql/mutations";


const client = generateClient();
export const PokerHandContext = createContext();

export const PokerHandProvider = ({ children }) => {


    const [pokerHand, setPokerHand] = useState({
        //id: '',
        playerId: '',
        tableType: '',
        handTags: [], // Asegúrate de que esto sea un array vacío
        heroPosition: '',
        handTitle: '',
        myHand_1: '',
        myHand_2: '',
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

    const createPokerHand = async () => {
        try {
            const result = await client.graphql({
                query: createHandMutation,
                variables: { input: pokerHand }
            });
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PokerHandContext.Provider value={{ pokerHand,createPokerHand, updatePokerHand }}>
            {children}
        </PokerHandContext.Provider>
    );
};
