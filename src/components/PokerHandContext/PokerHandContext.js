import React, { createContext, useState } from 'react';
import { generateClient } from "aws-amplify/api";

import {
    createHands as createHandMutation,
    updateHands as updateHandMutation
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
        tableType: '6',
        handTags: '', // Asegúrate de que esto sea un array vacío
        heroPosition: '9',
        handTitle: '',
        myHand_1: '',
        myHand_2: '',
        preflopNotes: '',
        preflopAction: '',
        preflopHeroRange: '{}',
        preflopVillainRange: '{}',
        flopNotes: '',
        flopAction: '',
        flopHeroRange: '{}',
        flopVillainRange: '{}',
        turnNotes: '',
        turnAction: '',
        turnHeroRange: '{}',
        turnVillainRange: '{}',
        riverNotes: '',
        riverAction: '',
        riverHeroRange: '{}',
        riverVillainRange: '{}',
        flopCards_1: '',
        flopCards_2: '',
        flopCards_3: '',
        turnCard: '',
        riverCard: '',
        villainPosition: '9'
    });

    const [pokerHandList, setPokerHandList] = useState([]);

    const updatePokerHand = (key, value) => {
        setPokerHand(prevState => ({
            ...prevState,
            [key]: value,
        }));



    };

    const createPokerHandDB = async () => {


        if (!pokerHand.handTitle.trim()) {

            return { success: false, error: 'Hand title cannot be empty.' };
        }

        const newHandId = Date.now();

        try {

            const result = await client.graphql({
                query: createHandMutation,
                variables: { input: {
                        id: newHandId,
                        playerId: pokerHand.playerId,
                        tableType: pokerHand.tableType,
                        handTags: pokerHand.handTags, // Asegúrate de que esto sea un array vacío
                        heroPosition: pokerHand.heroPosition,
                        handTitle: pokerHand.handTitle,
                        myHand_1: pokerHand.myHand_1,
                        myHand_2: pokerHand.myHand_2,
                        preflopNotes: pokerHand.preflopNotes,
                        preflopAction: pokerHand.preflopAction,
                        preflopHeroRange: pokerHand.preflopHeroRange,
                        preflopVillainRange: pokerHand.preflopVillainRange,
                        flopNotes: pokerHand.flopNotes,
                        flopAction: pokerHand.flopAction,
                        flopHeroRange: pokerHand.flopHeroRange,
                        flopVillainRange: pokerHand.flopVillainRange,
                        turnNotes: pokerHand.turnNotes,
                        turnAction: pokerHand.turnAction,
                        turnHeroRange: pokerHand.turnHeroRange,
                        turnVillainRange: pokerHand.turnVillainRange,
                        riverNotes: pokerHand.riverNotes,
                        riverAction: pokerHand.riverAction,
                        riverHeroRange: pokerHand.riverHeroRange,
                        riverVillainRange: pokerHand.riverVillainRange,
                        flopCards_1: pokerHand.flopCards_1,
                        flopCards_2: pokerHand.flopCards_2,
                        flopCards_3: pokerHand.flopCards_3,
                        turnCard: pokerHand.turnCard,
                        riverCard: pokerHand.riverCard,
                        villainPosition: pokerHand.villainPosition

                    } }
            });
            updatePokerHand('id', newHandId);
            return { success: true, data: result };

        } catch (error) {

            return { success: false, error: error.message };
        }
    };

    const updatePokerHandDB = async () => {



        if (!pokerHand.handTitle.trim()) {

            return { success: false, error: 'Hand title cannot be empty.' };
        }



        try {

            const result = await client.graphql({
                query: updateHandMutation,
                variables: { input: {
                        id: pokerHand.id,
                        playerId: pokerHand.playerId,
                        tableType: pokerHand.tableType,
                        handTags: pokerHand.handTags, // Asegúrate de que esto sea un array vacío
                        heroPosition: pokerHand.heroPosition,
                        handTitle: pokerHand.handTitle,
                        myHand_1: pokerHand.myHand_1,
                        myHand_2: pokerHand.myHand_2,
                        preflopNotes: pokerHand.preflopNotes,
                        preflopAction: pokerHand.preflopAction,
                        preflopHeroRange: pokerHand.preflopHeroRange,
                        preflopVillainRange: pokerHand.preflopVillainRange,
                        flopNotes: pokerHand.flopNotes,
                        flopAction: pokerHand.flopAction,
                        flopHeroRange: pokerHand.flopHeroRange,
                        flopVillainRange: pokerHand.flopVillainRange,
                        turnNotes: pokerHand.turnNotes,
                        turnAction: pokerHand.turnAction,
                        turnHeroRange: pokerHand.turnHeroRange,
                        turnVillainRange: pokerHand.turnVillainRange,
                        riverNotes: pokerHand.riverNotes,
                        riverAction: pokerHand.riverAction,
                        riverHeroRange: pokerHand.riverHeroRange,
                        riverVillainRange: pokerHand.riverVillainRange,
                        flopCards_1: pokerHand.flopCards_1,
                        flopCards_2: pokerHand.flopCards_2,
                        flopCards_3: pokerHand.flopCards_3,
                        turnCard: pokerHand.turnCard,
                        riverCard: pokerHand.riverCard,
                        villainPosition: pokerHand.villainPosition
                } }
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
        <PokerHandContext.Provider value={{ pokerHand,pokerHandList,createPokerHandDB, updatePokerHandDB, updatePokerHand, fetchPokerHands, setPokerHand }}>
            {children}
        </PokerHandContext.Provider>
    );
};
