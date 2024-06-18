import React, { useState, useEffect, useContext } from 'react';
import { PokerHandContext } from '../PokerHandContext/PokerHandContext';
import { useAuthenticator } from '@aws-amplify/ui-react';
import CardSelector  from '../CardSelector/CardSelector';
import './PokerStats.css';



function PokerStats({sequence , stake, membership}) {
    const { signOut, user } = useAuthenticator();
    const { pokerHand, setPokerHand , pokerHandList, fetchPokerHandsTrainer , resetPokerHand, resetPokerHandList  } = useContext(PokerHandContext);



    return (
        <div className="poker-stats-wrapper">
            Poker Stats
        </div>
    );
}

export default PokerStats;