import React from 'react';
import StreetColumn from '../StreetColumn/StreetColumn';
import './MainContent.css';

function MainContent({membership}) {
    const streets = ['Preflop', 'Flop', 'Turn', 'River'];
    return (
        <div className="MainContent">
            {streets.map(street => (

                <StreetColumn key={street} streetName={street}
                              boardCards="A♠ K♦ 5♥"
                              myRange="22+, AJs+, AJo+"
                              rivalRange="30% - TT+, AQ+"
                              notes="Rival tiende a bluffear en flops secos"
                              membership={membership}
                />
            ))}
        </div>
    );
}

export default MainContent;