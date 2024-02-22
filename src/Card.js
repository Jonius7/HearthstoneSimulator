import React, { useState, useEffect } from 'react';

const Card = (props) => {


    return (
        <div class="card" style={{backgroundImage: `url("https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${props.selectedOption}.png")`}}></div>
    );
};

export default Card;