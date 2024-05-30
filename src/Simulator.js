import React, { useState, useEffect } from 'react';
import Select from "react-select";
import cards from './cards.json';
import Autocomplete from "./AutoComplete";
import CardDivs from "./cardDivs";
import Board from "./Board";
import CardSelector from "./CardSelector";
import CardHand from "./CardHand";
import "./scss/App.scss";
import board from './images/board.webp';
import Cookies from 'js-cookie';



const Simulator = () => {
    const [manaCrystals1, setManaCrystals1] = useState(1);
    const [manaCrystals2, setManaCrystals2] = useState(1);
    const classes = ['Death Knight', 'Demon Hunter', 'Druid', 'Hunter', 
    'Mage', 'Paladin', 'Priest', 'Rogue', 'Shaman', 'Warlock', 'Warrior'];
    const [player1Class, setPlayer1Class] = useState(2);
    const [player2Class, setPlayer2Class] = useState(4);
    const [player1Health, setPlayer1Health] = useState(30);
    const [player2Health, setPlayer2Health] = useState(30);
    const [player1Armor, setPlayer1Armor] = useState(0);
    const [player2Armor, setPlayer2Armor] = useState(0);

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

    const [boxes, setBoxes] = useState([]);

    useEffect(() => {
        const getOptions = async () => {
          try {
            const response = await fetch("/data/cards.collectible.json");
            const options = await response.json();
            //console.log(options);
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
            //console.log(options2);
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
    const handleClick = ({ pageX, pageY }) => {
        setBoxes((boxes) => [...boxes, {x: pageX, y: pageY }]);
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
    const handleAddCrystal1 = () => {
        if (manaCrystals1 < 10) {
            localStorage.setItem('manaCrystals1', JSON.stringify(manaCrystals1 + 1));
            setManaCrystals1(manaCrystals1 + 1);
        }
    }

    const handleRemoveCrystal1 = () => {
        if (manaCrystals1 > 1) {
            localStorage.setItem('manaCrystals1', JSON.stringify(manaCrystals1 - 1));
            setManaCrystals1(manaCrystals1 - 1);
        }
    }

    const handleAddCrystal2 = () => {
        if (manaCrystals2 < 10) {
            localStorage.setItem('manaCrystals2', JSON.stringify(manaCrystals2 + 1));
            setManaCrystals2(manaCrystals2 + 1);
        }
    }

    const handleRemoveCrystal2 = () => {
        if (manaCrystals2 > 1) {
            localStorage.setItem('manaCrystals2', JSON.stringify(manaCrystals2 - 1));
            setManaCrystals2(manaCrystals2 - 1);
        }
    }

    //Player 1 Class
    const handleNextPlayer1Class = () => {
        if (player1Class < 10) {
            localStorage.setItem('player1Class', JSON.stringify(player1Class + 1));
            setPlayer1Class(player1Class + 1);
        }
    }

    const handlePrevPlayer1Class = () => {
        if (player1Class > 0) {
            localStorage.setItem('player1Class', JSON.stringify(player1Class - 1));
            setPlayer1Class(player1Class - 1);
        }
    }

    //Player 2 Class
    const handleNextPlayer2Class = () => {
        if (player2Class < 10) {
            localStorage.setItem('player2Class', JSON.stringify(player2Class + 1));
            setPlayer2Class(player2Class + 1);
        }
    }

    const handlePrevPlayer2Class = () => {
        if (player2Class > 0) {
            localStorage.setItem('player2Class', JSON.stringify(player2Class - 1));
            setPlayer2Class(player2Class - 1);
        }
    }

    const handleSaveToLocalStorage = () => {
        localStorage.setItem('player1Health', JSON.stringify(player1Health))
    }

    const handleLoadFromLocalStorage = () => {
        const keys = ['manaCrystals1', 'manaCrystals2', 
        'player1Health', 'player2Health', 
        'player1Armor', 'player2Armor', 
        'player1Class', 'player2Class'];
        const sets = ['setManaCrystals1', 'setManaCrystals2', 
        'setPlayer1Health', 'setPlayer2Health', 
        'setPlayer1Armor', 'setPlayer2Armor', 
        'setPlayer1Class', 'setPlayer2Class'];
        const storedValues = []
        for (let i = 0; i <= keys.length; i++) {
            const storedData = localStorage.getItem(keys[i]);
            if (storedData) {
                storedValues.push(JSON.parse(storedData));
                if (storedValues[i] !== null) {
                    const func = eval(sets[i]);
                    if (typeof func === 'function') {
                        func(storedValues[i]);
                    } else {
                        console.error ('Invalid function name');
                    }
                }
            }
        }

        /*
        const storedValue1 = JSON.parse(localStorage.getItem('player1Health'));
        const storedValue2 = JSON.parse(localStorage.getItem('player2Health'));
        if (storedValue1 !== null) {
            setPlayer1Health(storedValue1);
        }
        if (storedValue2 !== null) {
            setPlayer2Health(storedValue2);
        }*/

    }

    useEffect(() => {
        handleLoadFromLocalStorage();
    }, []);

    //Player 1 Health
    const handleIncPlayer1Health = () => {
        if (player1Health < 30) {
            localStorage.setItem('player1Health', JSON.stringify(player1Health + 1))
            setPlayer1Health(player1Health + 1)
        }
    }

    const handleDecPlayer1Health = () => {
        if (player1Health > 0) {
            localStorage.setItem('player1Health', JSON.stringify(player1Health - 1))
            setPlayer1Health(player1Health - 1)
        }
    }

    //Player 2 Health
    const handleIncPlayer2Health = () => {
        if (player2Health < 30) {
            localStorage.setItem('player2Health', JSON.stringify(player2Health + 1))
            setPlayer2Health(player2Health + 1)
        }
    }

    const handleDecPlayer2Health = () => {
        if (player2Health > 0) {
            localStorage.setItem('player2Health', JSON.stringify(player2Health - 1))
            setPlayer2Health(player2Health - 1)
        }
    }

    //Player 1 Armor
    const handleIncPlayer1Armor = () => {
        if (player1Armor < 100) {
            localStorage.setItem('player1Armor', JSON.stringify(player1Armor + 1))
            setPlayer1Armor(player1Armor + 1)
        }
    }

    const handleDecPlayer1Armor = () => {
        if (player1Armor > 0) {
            localStorage.setItem('player1Armor', JSON.stringify(player1Armor - 1))
            setPlayer1Armor(player1Armor - 1)
        }
    }

    //Player 2 Armor
    const handleIncPlayer2Armor = () => {
        if (player2Armor < 100) {
            localStorage.setItem('player2Armor', JSON.stringify(player2Armor + 1))
            setPlayer2Armor(player2Armor + 1)
        }
    }

    const handleDecPlayer2Armor = () => {
        if (player2Armor > 0) {
            localStorage.setItem('player2Armor', JSON.stringify(player2Armor - 1))
            setPlayer2Armor(player2Armor - 1)
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
            <img src={board} className="HS-board" alt="board" />
            <div className="SimulatorControls">
                
                

                
                <table>
                    <tr>
                        <td>
                            <p>Player 1 Mana</p>
                            <button onClick={handleAddCrystal1}>+</button>
                            <button onClick={handleRemoveCrystal1}>-</button>
                            <p>{manaCrystals1}</p>
                            <div className="ManaBar1" style={{width: manaCrystals1 * 31}}></div>
                        </td>
                        <td>
                            <p>Player 2 Mana</p>
                            <button onClick={handleAddCrystal2}>+</button>
                            <button onClick={handleRemoveCrystal2}>-</button>
                            <p>{manaCrystals2}</p>
                            <div className="ManaBar2" style={{width: manaCrystals2 * 31}}></div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Player 1 Class</p>
                            <button onClick={handleNextPlayer1Class}>+</button>
                            <button onClick={handlePrevPlayer1Class}>-</button>
                            <p>{classes[player1Class]}</p>
                            <div className="Player1Class" style={{backgroundImage: `url("images/heroes/${classes[player1Class]}.png")`}}></div>
                            <div className="Player1HeroPower" style={{backgroundImage: `url("images/hero_powers/HERO_${classes[player1Class]}.webp")`}}></div>
                        </td>
                        <td>
                            <p>Player 2 Class</p>
                            <button onClick={handleNextPlayer2Class}>+</button>
                            <button onClick={handlePrevPlayer2Class}>-</button>
                            <p>{classes[player2Class]}</p>
                            <div className="Player2Class" style={{backgroundImage: `url("images/heroes/${classes[player2Class]}.png")`}}></div>
                            <div className="Player2HeroPower" style={{backgroundImage: `url("images/hero_powers/HERO_${classes[player2Class]}.webp")`}}></div>
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
                        <td>
                            <p>Player 1 Armor</p>
                            <button onClick={handleIncPlayer1Armor}>+</button>
                            <button onClick={handleDecPlayer1Armor}>-</button>
                            <p>{player1Armor}</p>
                            {player1Armor !== 0 && (
                                <div className="Player1Armor">{player1Armor}</div>
                            )}                            
                        </td>
                        <td>
                            <p>Player 2 Armor</p>
                            <button onClick={handleIncPlayer2Armor}>+</button>
                            <button onClick={handleDecPlayer2Armor}>-</button>
                            <p>{player2Armor}</p>
                            {player2Armor !== 0 && (
                                <div className="Player2Armor">{player2Armor}</div>
                            )}                            
                        </td>
                    </tr>
                </table>
                <table>
                    <tr>
                        <td><CardSelector cardPosition="-3"/></td>
                        <td><CardSelector cardPosition="-2"/></td>
                        <td><CardSelector cardPosition="-1"/></td>
                        <td><CardSelector cardPosition="0"/></td>
                        <td><CardSelector cardPosition="1"/></td>
                        <td><CardSelector cardPosition="2"/></td>
                        <td><CardSelector cardPosition="3"/></td>
                    </tr>
                </table>
                <CardHand />

                {/*<Board />
                <Board />*/}
                {/*<Autocomplete
                    suggestions={jsonNameData}
                />*/}

                {/*<div className="app" onClick={handleClick}>
                    {boxes.map((box) => (
                        <div className="box" style={{ left: box.x, top: box.y }}></div>
                    ))}
                </div>*/} 
            </div>
        </div>
        
    );
};

export default Simulator;
