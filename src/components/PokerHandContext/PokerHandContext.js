import React, { createContext, useState } from 'react';
import { generateClient } from "aws-amplify/api";

import {
    createHands as createHandMutation,
    updateHands as updatehandMutation
} from "../../graphql/mutations";
import {
    listHands as listHandsQuery,
} from "../../graphql/queries";


const client = generateClient();
export const PokerHandContext = createContext();

export const PokerHandProvider = ({ children }) => {


    const [pokerHand, setPokerHand] = useState({
        id: '',
        playerId: '',
        tableType: '',
        handTags: [], // Asegúrate de que esto sea un array vacío
        heroPosition: 9,
        handTitle: '',
        myHand_1: '',
        myHand_2: '',
        preflopNotes: '',
        preflopActions: '',
        preflopHeroRange: '{}',
        preflopVillainRange: '{}',
        flopNotes: '',
        flopActions: '',
        flopHeroRange: '{}',
        flopVillainRange: '{}',
        turnNotes: '',
        turnActions: '',
        turnHeroRange: '{}',
        turnVillainRange: '{}',
        riverNotes: '',
        riverActions: '',
        riverHeroRange: '{}',
        riverVillainRange: '{}',
        flopCards_1: '',
        flopCards_2: '',
        flopCards_3: '',
        turnCard: '',
        riverCard: '',
        villainPosition: 9
    });

    const [pokerHandList, setPokerHandList] = useState([]);

    const updatePokerHand = (key, value) => {
        setPokerHand(prevState => ({
            ...prevState,
            [key]: value,
        }));


        console.log({pokerHand});
    };

    const createPokerHand = async () => {

        console.log('test createhand - contextpokerhand');

        if (!pokerHand.handTitle.trim()) {
            return { success: false, error: 'Hand title cannot be empty.' };
        }

        try {

            const result = await client.graphql({
                query: createHandMutation,
                variables: { input: pokerHand }
            });
            return { success: true, data: result };
        } catch (error) {

            return { success: false, error: error.message };
        }
    };

    const fetchPokerHands = async (playerId) => {
        try {
            const result = await client.graphql({
                query: listHandsQuery,
                variables: { filter: { playerId: { eq: playerId } } }
            });
            setPokerHandList(result.data.listHands.items);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PokerHandContext.Provider value={{ pokerHand,pokerHandList,createPokerHand, updatePokerHand, fetchPokerHands, setPokerHand }}>
            {children}
        </PokerHandContext.Provider>
    );
};
