import React, { useState, useEffect } from 'react';
import Card from "./Card";

const CardHand = (props) => {

    return (
        <div class="cardshand">
            <Card selectedOption="AT_006"/>
            <Card selectedOption="AT_001"/>
            <Card selectedOption="DEEP_017"/>
            <Card />
            <Card />
        </div>
    );
};

export default CardHand;