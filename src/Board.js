import React, { useState, useEffect } from 'react';
import Select from "react-select";
import cards from './cards.json';
import CardDivs from "./cardDivs";
import CardImages from './CardImages';
import CustomMenuList from './CustomMenuList';

const Board = (props) => {
    const [cardPosition, setCardPosition] = useState(props.cardPosition);
    const [cardPosition2, setCardPosition2] = useState(props.cardPosition);
    
    const [selectedOption, setSelectedOption] = useState();
    const [selectedOption2, setSelectedOption2] = useState();
    const [player, setPlayer] =  useState(1);
    const [player2, setPlayer2] =  useState(2);
    const [options, setOptions] =  useState([]);
    const [options2, setOptions2] =  useState([]);
    //how to separate to create multiple instances

    const [showCardSelector, setShowCardSelector] = React.useState(true);
    let toggle = () => setShowCardSelector((showCardSelector) => !showCardSelector);


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

    const handleSetSelectedOption = e => {
        //console.log("Selected Value");
        setSelectedOption(e.value);
    }

    const handleSetSelectedOption2 = e => {
        //console.log("Selected Value");
        setSelectedOption2(e.value);
    }

    const handleSetPlayer = e => {
        setPlayer(e.value);
    }
    const handleSetPlayer2 = e => {
        setPlayer2(e.value);
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
        <div>
            <button onClick={toggle}>Select Cards</button>
            <div className={`cards-row ${showCardSelector ? 'hidden' : ''}`}>
                <table>
                    <tr>
                        <td class="wideTd">
                            <Select
                                className="cards"
                                defaultValue={selectedOption}
                                onChange={handleSetSelectedOption}
                                options={options}
                                components={{
                                    MenuList: CustomMenuList,
                                }}
                                required
                                isClearable={false}
                                id="name"
                            />
                            <div>Selected Option: {selectedOption}</div>
                        </td>
                        {/*<td>
                            <button onClick={handleIncCardPosition}>+</button>
                            <button onClick={handleDecCardPosition}>-</button>
                            <p>{cardPosition}</p>
                        </td>*/}
                        <td class="wideTd">
                            <Select
                                className="cards"
                                defaultValue={selectedOption2}
                                onChange={handleSetSelectedOption2}
                                options={options2}
                                components={{
                                    MenuList: CustomMenuList,
                                }}
                                required
                                isClearable={false}
                                id="name2"
                            />
                            
                            <div>Selected Option: {selectedOption2}</div>
                        </td>
                        {/*<td>
                            <button onClick={handleIncCardPosition2}>+</button>
                            <button onClick={handleDecCardPosition2}>-</button>
                            <p>{cardPosition2}</p>
                        </td>*/}
                        <td>
                            <cardDivs
                                className="card-divs"
                                state="1"
                            />
                        </td>
                    </tr>
                </table>
            </div>
            <div className="images-row">
                <CardImages selectedOption={selectedOption} cardPosition={cardPosition} player={player} />
                <CardImages selectedOption={selectedOption2} cardPosition={cardPosition2} player={player2} />
            </div>
        </div>
    );
};

export default Board;