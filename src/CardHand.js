import React, { useState, useEffect } from 'react';
import Card from "./Card";
import CardHandBoard from "./CardHandBoard";

const CardHand = (props) => {

    const [showCardHand, setShowCardHand] = React.useState(false);
    let toggle = () => setShowCardHand((showCardHand) => !showCardHand);

    let cardsId = 0;

    const [cards, setCards] = useState([]);


    return (
        <div>
            {/*<button onClick={() => {
                cards.push({
                    id: cardsId++,
                });
            }}>Add</button>*/}

            <div className={showCardHand ? 'hidden' : ''}>
                {<CardHandBoard/>}
            </div>
            {/*
            <div className="cardshand">
                <Card selectedOption="AT_006"/>
                <Card selectedOption="AT_001"/>
                <Card selectedOption="DEEP_017"/>
                <Card selectedOption={props.selectedOption}/>
                <Card />
            </div>
            */}
            
        </div>
    );
};

export default CardHand;