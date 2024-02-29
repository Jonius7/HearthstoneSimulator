import React, { useState, useEffect } from 'react';
import Select from "react-select";
import cards from './cards.json';
import CardImages from './CardImages';
import CustomMenuList from './CustomMenuList';
import Card from './Card';
import CardHandComponent from './CardHandComponent';

const CardHandBoard = (props) => {
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


    const { initCardHandComponent } = CardHandComponent()
    useEffect(() => {
        initCardHandComponent();
    }, [])

    const handleSetSelectedOption = e => {
        setSelectedOption(e.value);
    }

    const handleSetSelectedOption2 = e => {
        setSelectedOption2(e.value);
    }


    return (
        <div>
            <button className="floating" onClick={toggle}>Select Hand</button>
            <div className={`cards-row ${showCardSelector ? 'hidden' : ''}`}>
                <table>
                    <tr>
                        <td class="narrowTd">
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
                            {/*<div>Selected Option: {selectedOption}</div>*/}
                        </td>
                        <td class="narrowTd">
                            <Select
                                className="cards"
                                defaultValue={selectedOption2}
                                onChange={handleSetSelectedOption2}
                                options={options}
                                components={{
                                    MenuList: CustomMenuList,
                                }}
                                required
                                isClearable={false}
                                id="name"
                            />
                            {/*<div>Selected Option: {selectedOption2}</div>*/}
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

            <div className="cardshand">
                <Card selectedOption={selectedOption}/>
                <Card selectedOption={selectedOption2}/>
                <Card selectedOption={selectedOption}/>
                <Card selectedOption={selectedOption2}/>
                <Card />
            </div>
        </div>
    );
};

export default CardHandBoard;