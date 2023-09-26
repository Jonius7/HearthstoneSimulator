import React, { useState } from 'react';

const Simulator = () => {
    const [manaCrystals, setManaCrystals] = useState(1);

    const handleAddCrystal = () => {
        if (manaCrystals < 10) {
            setManaCrystals(manaCrystals + 1);
        }
    }

    const handleRemoveCrystal = () => {
        if (manaCrystals > 1) {
            setManaCrystals(manaCrystals - 1);
        }
    }


    return (
        <div className="Simulator">
            <p>Mana Crystals</p>
            <button onClick={handleAddCrystal}>+</button>
            <button onClick={handleRemoveCrystal}>-</button>
            <p>{manaCrystals}</p>
            <div className="ManaBar">
                
            </div>
        </div>
    );
};

export default Simulator;
