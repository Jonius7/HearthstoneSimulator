import React, { useState } from 'react';

const Simulator = () => {
    const [manaCrystals, setManaCrystals] = useState(1);
    const classes = ['Death Knight', 'Demon Hunter', 'Druid', 'Hunter', 
    'Mage', 'Paladin', 'Priest', 'Rogue', 'Shaman', 'Warlock', 'Warrior']
    const [player1Class, setPlayer1Class] = useState(2);
    const [player2Class, setPlayer2Class] = useState(4);

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

    const handleNextPlayer1Class = () => {
        if (player1Class < 10) {
            setPlayer1Class(player1Class + 1)
        }
    }

    const handlePrevPlayer1Class = () => {
        if (player1Class > 0) {
            setPlayer1Class(player1Class - 1)
        }
    }

    const handleNextPlayer2Class = () => {
        if (player2Class < 10) {
            setPlayer2Class(player2Class + 1)
        }
    }

    const handlePrevPlayer2Class = () => {
        if (player2Class > 0) {
            setPlayer2Class(player2Class - 1)
        }
    }


    return (
        <div className="Simulator">
            <p>Mana Crystals</p>
            <button onClick={handleAddCrystal}>+</button>
            <button onClick={handleRemoveCrystal}>-</button>
            <p>{manaCrystals}</p>
            <div className="ManaBar" style={{width: manaCrystals * 31}}>

            </div>
            <table>
                <tr>
                    <td>
                        <p>Player 1 Class</p>
                        <button onClick={handleNextPlayer1Class}>+</button>
                        <button onClick={handlePrevPlayer1Class}>-</button>
                        <p>{classes[player1Class]}</p>
                        <div className="Player1Class" style={{backgroundImage: `url("images/heroes/${classes[player1Class]}.png")`}}>

                        </div>
                    </td>
                    <td>
                        <p>Player 2 Class</p>
                        <button onClick={handleNextPlayer2Class}>+</button>
                        <button onClick={handlePrevPlayer2Class}>-</button>
                        <p>{classes[player2Class]}</p>
                        <div className="Player2Class" style={{backgroundImage: `url("images/heroes/${classes[player2Class]}.png")`}}>

                        </div>
                    </td>
                </tr>
                
            </table>
        </div>
    );
};

export default Simulator;
