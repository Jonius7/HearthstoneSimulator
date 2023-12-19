import React, { useState, useEffect } from 'react';
import Select from "react-select";
import Board from "./Board";

const CardImages = (props) => {


    return (
        <div className="images-row">
            <img 
                className="card-image" 
                src={`https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${props.selectedOption}.png`} 
                alt={props.selectedOption}
                style={{top: `calc(41vh + ${props.player * 14}vh)`, left: `calc(46vw + ${props.cardPosition * 6.5}vw)`}}>
            </img>            
        </div>
    )
}

export default CardImages;