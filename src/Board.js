import React, { useState, useEffect } from 'react';
import Select from "react-select";
import cards from './cards.json';

const Board = () => {
    const [cardPosition, setCardPosition] = useState(0);
    const [cardPosition2, setCardPosition2] = useState(0);
    
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

    const handleSetSelectedOption = e => {
        //console.log("Selected Value");
        setSelectedOption(e.value);
    }

    const handleSetSelectedOption2 = e => {
        //console.log("Selected Value");
        setSelectedOption2(e.value);
    }

    const handleIncCardPosition = () => {
        if (cardPosition < 3) {
            setCardPosition(cardPosition + 1);
        }
    }

    const handleDecCardPosition = () => {
        if (cardPosition > -3) {
            setCardPosition(cardPosition - 1);
        }
    }

    const handleIncCardPosition2 = () => {
        if (cardPosition2 < 3) {
            setCardPosition2(cardPosition2 + 1);
        }
    }

    const handleDecCardPosition2 = () => {
        if (cardPosition2 > -3) {
            setCardPosition2(cardPosition2 - 1);
        }
    }

    return (
        <div className="cards-row">
            <table>
                <tr>
                    <td class="wideTd">
                        <Select
                            className="cards"
                            defaultValue={selectedOption}
                            onChange={handleSetSelectedOption}
                            options={options}
                            required
                            isClearable={false}
                            id="name"
                        />
                        <img 
                            className="card-image" 
                            src={`https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${selectedOption}.png`} 
                            alt={selectedOption}
                            style={{left: `calc(46.5vw + ${cardPosition * 6}vw)`}}>
                        </img>
                        <div>Selected Option: {selectedOption}</div>
                    </td>
                    <td>
                        <button onClick={handleIncCardPosition}>+</button>
                        <button onClick={handleDecCardPosition}>-</button>
                        <p>{cardPosition}</p>
                    </td>
                    <td class="wideTd">
                        <Select
                            className="cards"
                            defaultValue={selectedOption2}
                            onChange={handleSetSelectedOption2}
                            options={options2}
                            required
                            isClearable={false}
                            id="name2"
                        />
                        <img 
                            className="card-image" 
                            src={`https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${selectedOption2}.png`} 
                            alt={selectedOption2}
                            style={{top: "35vh", left: `calc(46.5vw + ${cardPosition2 * 6}vw)`}}>
                        </img>
                        <div>Selected Option: {selectedOption2}</div>
                    </td>
                    <td>
                        <button onClick={handleIncCardPosition2}>+</button>
                        <button onClick={handleDecCardPosition2}>-</button>
                        <p>{cardPosition2}</p>
                    </td>
                    <td>
                        <cardDivs
                            className="card-divs"
                            state="1"
                        />
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default Board;