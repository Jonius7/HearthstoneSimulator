import React, { useState } from 'react';
import cards from './cards.json';
import Autocomplete from "./AutoComplete";
//import board from './images/board.webp';

const Simulator = () => {
    const [manaCrystals, setManaCrystals] = useState(1);
    const classes = ['Death Knight', 'Demon Hunter', 'Druid', 'Hunter', 
    'Mage', 'Paladin', 'Priest', 'Rogue', 'Shaman', 'Warlock', 'Warrior']
    const [player1Class, setPlayer1Class] = useState(2);
    const [player2Class, setPlayer2Class] = useState(4);
    const [player1Health, setPlayer1Health] = useState(30);
    const [player2Health, setPlayer2Health] = useState(30);


    const jsonStringData = JSON.stringify(cards);
    const jsonData = JSON.parse(jsonStringData);
    const jsonNameData = []
    for (var i = 0; i < jsonData.length; i++) {
        jsonNameData.push(jsonData[i]["name"]);
    }

    //Mana Crystals
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

    //Player 1 Class
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

    //Player 2 Class
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

    //Player 1 Health
    const handleIncPlayer1Health = () => {
        if (player1Health < 30) {
            setPlayer1Health(player1Health + 1)
        }
    }

    const handleDecPlayer1Health = () => {
        if (player1Health > 0) {
            setPlayer1Health(player1Health - 1)
        }
    }

    //Player 2 Health
    const handleIncPlayer2Health = () => {
        if (player2Health < 30) {
            setPlayer2Health(player2Health + 1)
        }
    }

    const handleDecPlayer2Health = () => {
        if (player2Health > 0) {
            setPlayer2Health(player2Health - 1)
        }
    }
    
    //Player 1 Health Color
    const handlePlayer1HealthColor = () => {

    }

    const handlePlayer2HealthColor = () => {
        
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
                    <td>
                        <p>Player 1 Health</p>
                        <button onClick={handleIncPlayer1Health}>+</button>
                        <button onClick={handleDecPlayer1Health}>-</button>
                        <p>{player1Health}</p>
                        <div className="Player1Health">{player1Health}</div>
                    </td>
                    <td>
                        <p>Player 2 Health</p>
                        <button onClick={handleIncPlayer2Health}>+</button>
                        <button onClick={handleDecPlayer2Health}>-</button>
                        <p>{player2Health}</p>
                        <div className="Player2Health">{player2Health}</div>
                    </td>
                </tr>
                
            </table>
            <Autocomplete
                suggestions={jsonNameData}
            />
            
            
        </div>
    );
};

export default Simulator;
