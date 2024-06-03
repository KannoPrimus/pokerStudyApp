import React, { useState } from 'react';
import CardSelector from '../CardSelector/CardSelector'; // Asegúrate de que la ruta es correcta
import CardMatrix from '../CardMatrix/CardMatrix';
import PokerTable from '../PokerTable/PokerTable';
import PokerNotes from '../PokerNotes/PokerNotes';
import PokerActions from '../PokerActions/PokerActions';
import './StreetColumn.css';

function StreetColumn({ streetName, myRange, rivalRange, notes }) {

    const [isHeroCollapsed, setIsHeroCollapsed] = useState(true);
    const [isVillainCollapsed, setIsVillainCollapsed] = useState(true);

    const toggleHeroCollapse = () => {
        setIsHeroCollapsed(!isHeroCollapsed);
    };

    const toggleVillainCollapse = () => {
        setIsVillainCollapsed(!isVillainCollapsed);
    };

    return (
        <div className="street-column-container">

            <div className="board-cards section ">
                {/* Renderizar CardSelectors basado en el streetName */}
                {streetName === 'Preflop' && (
                    <>
                        <PokerTable />
                        <div>
                            <div className="title">Mi mano</div>
                            <div className="board-cards-hero">
                                <CardSelector  card="myHand_1"  trainer="false"/>
                                <CardSelector  card="myHand_2"  trainer="false"/>
                            </div>
                        </div>
                    </>
                        )}
                {streetName === 'Flop' && (
                    <>
                        <CardSelector card="flopCards_1" trainer="false"/>
                        <CardSelector card="flopCards_2" trainer="false"/>
                        <CardSelector card="flopCards_3" trainer="false"/>
                    </>
                )}
                {streetName === 'Turn' && <CardSelector card="turnCard" trainer="false"/>}
                {streetName === 'River' && <CardSelector card="riverCard" trainer="false"/>}
            </div>
            <div className="streetInfo">
                <div className="section"><PokerActions id={streetName}/></div>
                <div className="section"><PokerNotes id={streetName}/></div>
                <div className="collapsible-section">
                <span className="title" onClick={toggleHeroCollapse}> {isHeroCollapsed ? 'Rango Hero' : 'Ocultar Rango de HERO'} </span>
                    {!isHeroCollapsed && (
                        <div className="collapsible-content">
                <div className="section"><CardMatrix id={streetName} myRange="true" />
                </div>
                        </div>
                            )}

                </div>
                <span className="title">Rango Villano</span>
                <div className="section"><CardMatrix id={streetName} myRange="false"/></div>
            </div>
        </div>
    );
}

export default StreetColumn;
