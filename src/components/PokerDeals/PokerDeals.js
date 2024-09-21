import React, { useState, useEffect, useContext } from 'react';
import './PokerDeals.css';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { PokerHandContext } from '../PokerHandContext/PokerHandContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Importar las imágenes desde assets
import LogoRedstar from '../../assets/Redstar.jpg';
import LogoChampion from '../../assets/Champion.jpg';
import LogoGG from '../../assets/ggpoker.jpg';
import LogoCoinpoker from '../../assets/Coinpoker.jpg';
import LogoACR from '../../assets/Acr.jpg';
import LogoBodog from '../../assets/Bodog.jpg';

library.add(fas);

function PokerDeals() {
    const { pokerHand } = useContext(PokerHandContext);
    const { user } = useAuthenticator();

    // Arreglo con la información de los Poker Deals, incluyendo imágenes
    const [deals, setDeals] = useState([
        { title: 'Redstar', description: '-  35% flat Rakeback \n' +
            '- Welcome bonus clear at 10%  \n' +
            '-  Unlimited reload bonuses ', rb: '$100', imageUrl: LogoRedstar, link:'https://c.rsppartners.com/clickthrgh?btag=a_11867b_28l_1' },
        { title: 'Champion Poker', description: '- Top iPoker deal \n' +
            '- 30% Rakeback                  \n' +
            '- Agent deal crypto deposit ( 0% admin fee)              \n' +
            '- Rake chase (value from 10% - 16.67% value)', rb: '$200', imageUrl: LogoChampion, link:'https://online.championpoker.com/promoRedirect?key=ej0xMzUzMDc4OSZsPTEzNTI0MzE2JnA9NDYyNQ%3D%3D' },
        { title: 'GG Poker', description: '- $600 Bonus - 60% Rakeback', rb: '$300', imageUrl: LogoGG , link:'https://click.ggpartners.com/?serial=4779&creative_id=3275&anid=' },
        { title: 'Coin Poker', description: '- 30% Rakeback - USA welcome - 100% crypto', rb: '$400', imageUrl: LogoCoinpoker, link:'https://record.coinpokeraffiliates.com/_vaFTMGO1HKlhg6WO2I1rgWNd7ZgqdRLk/21/' },
        { title: 'ACR Poker', description: '- $1000 Bonus - USA Welcome - Big multi tables tournaments - Crypto Deposits', rb: '$500', imageUrl: LogoACR, link:'https://record.secure.acraffiliates.com/_XNQv-UmOIkKnMd4BJjTdCGNd7ZgqdRLk/58/' },
        { title: 'Bodog', description: '- $1000 Bonus', rb: '$600', imageUrl: LogoBodog, link:'https://record.revenuenetwork.com/_PnEi1Lre7bY3aXuVKnmDUmNd7ZgqdRLk/104/' },
        // Agrega más deals según sea necesario
    ]);

    useEffect(() => {
        // Lógica adicional si es necesario
    }, [pokerHand.id]);

    return (
        <div className="deals-grid-container">
            {deals.length === 0 ? (
                <p>No deals available.</p>
            ) : (
                <div className="deals-grid">
                    {deals.map((deal, index) => (
                        <div key={index} className="deal-item">
                            <img src={deal.imageUrl} alt={deal.title} className="deal-image" />
                            <h3>{deal.title}</h3>
                            <p>{deal.description}</p>
                            <p> </p>
                            <button onClick={() => window.open(deal.link, '_blank', 'noopener,noreferrer')}>
                                Get Deal
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PokerDeals;
