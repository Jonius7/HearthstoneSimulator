import React, { useState, useEffect } from 'react';
import Select from "react-select";
import Board from "./Board";

const CardSelector = (props) => {
    const [showCardSelector, setShowCardSelector] = React.useState(false);
    let toggle = () => setShowCardSelector((showCardSelector) => !showCardSelector);
    {/*let style = {};
    if (!this.state.show) {
        style.display = 'none';
    }*/}
    return (
        <div>
            {/*<input type="submit" value="Select Cards" onClick={onClick} />
            { showCardSelector ? <Board /> : null }*/}
            
            <div className={showCardSelector ? 'hidden' : ''}>
                {<Board cardPosition={props.cardPosition}/>}
            </div>
        </div>
    )
}

export default CardSelector;