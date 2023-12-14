import React, { useState, useEffect } from 'react';
import Select from "react-select";
import cards from './cards.json';
import Autocomplete from "./AutoComplete";
import cardDivs from "./cardDivs";
import Board from "./Board";
import CardSelector from "./CardSelector";
//import board from './images/board.webp';


const Simulator = () => {
    const [manaCrystals, setManaCrystals] = useState(1);
    const classes = ['Death Knight', 'Demon Hunter', 'Druid', 'Hunter', 
    'Mage', 'Paladin', 'Priest', 'Rogue', 'Shaman', 'Warlock', 'Warrior'];
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

    const [selectedOption, setSelectedOption] = useState();
    const [selectedOption2, setSelectedOption2] = useState();
    const [options, setOptions] =  useState([]);
    const [options2, setOptions2] =  useState([]);
    //how to separate to create multiple instances

    useEffect(() => {
        const getOptions = async () => {
          try {
            const response = await fetch("/data/cards.collectible.json");
            const options = await response.json();
            console.log(options);
            setOptions(
              options.map(({ id, name, dbfId }) => ({
                dbfId,
                label: name,
                value: id
              }))
            );
          } catch (error) {
            // ignore
          }
        };
        getOptions();
    }, []);

    //solution to options2
    useEffect(() => {
        const getOptions2 = async () => {
          try {
            const response = await fetch("/data/cards.collectible.json");
            const options2 = await response.json();
            console.log(options2);
            setOptions2(
              options2.map(({ id, name, dbfId }) => ({
                dbfId,
                label: name,
                value: id
              }))
            );
          } catch (error) {
            // ignore
          }
        };
        getOptions2();
    }, []);

    let cardsArr = [];
    for (let i = 0; i <= 2; i++) {
        
    }

    const addCardItem = () => {

    }

    const createCardList = () => {
        return (
            <div>
                <Select
                    className="cards"
                    defaultValue={selectedOption}
                    onChange={handleSetSelectedOption}
                    options={options}
                    required
                    isClearable={false}
                    id="name"
                />
                <img className="card-image" src={`https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${selectedOption}.png`} alt={selectedOption}></img>
                <div>Selected Option: {selectedOption}</div>
            </div>
        );
    }

    const handleSetSelectedOption = e => {
        //console.log("Selected Value");
        setSelectedOption(e.value);
    }

    const handleSetSelectedOption2 = e => {
        //console.log("Selected Value");
        setSelectedOption2(e.value);
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
        if (player1Health < 30) {

        }
    }

    const handlePlayer2HealthColor = () => {
        if (player2Health < 30) {

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
                    <td>
                        <p>Player 1 Health</p>
                        <button onClick={handleIncPlayer1Health}>+</button>
                        <button onClick={handleDecPlayer1Health}>-</button>
                        <p>{player1Health}</p>
                        <div className="Player1Health" style={{color: player1Health < 30 ? "#D20403" : "white"}}>{player1Health}</div>
                    </td>
                    <td>
                        <p>Player 2 Health</p>
                        <button onClick={handleIncPlayer2Health}>+</button>
                        <button onClick={handleDecPlayer2Health}>-</button>
                        <p>{player2Health}</p>
                        <div className="Player2Health" style={{color: player2Health < 30 ? "#D20403" : "white"}}>{player2Health}</div>
                    </td>
                </tr>
                
            </table>
            
            <CardSelector />
            
            {/*<Board />
            <Board />*/}
            {/*<Autocomplete
                suggestions={jsonNameData}
            />*/}
            
        </div>
    );
};

export default Simulator;
