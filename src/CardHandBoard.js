import React, { useState, useEffect } from 'react';
import Select from "react-select";
import cards from './cards.json';
import CardImages from './CardImages';
import CardDivs from "./cardDivs.js";
import CustomMenuList from './CustomMenuList';
import Card from './Card';
import CardHandComponent from './CardHandComponent';
import { useCardHand } from './useCardHand';
import variables from './scss/App.module.scss';
import Draggable from 'react-draggable';
import DragMove from './DragMove.jsx';

const CardHandBoard = (props) => {
    const [cardPosition, setCardPosition] = useState(props.cardPosition);
    const [cardPosition2, setCardPosition2] = useState(props.cardPosition);
    
    const [selectedOption1, setSelectedOption] = useState();
    const [selectedOption2, setSelectedOption2] = useState();
    const [selectedOption3, setSelectedOption3] = useState();
    const [selectedOption4, setSelectedOption4] = useState();
    const [selectedOption5, setSelectedOption5] = useState();

    let [selectedOptions, setSelectedOptionsList] = useState([
        'card1', 'card2', 'card3', 'card4', 'card5'
    ]);

    const [player, setPlayer] =  useState(1);
    const [player2, setPlayer2] =  useState(2);
    const [options, setOptions] =  useState([]);
    const [options2, setOptions2] =  useState([]);
    const [NumberofCards, setNumberofCards] = useState(5);
    const cardElements1 = ['card1', 'card2', 'card3', 'card4', 'card5'];
    const cardElements2 = ['card1', 'card2', 'card3', 'card4', 'card5'];
    
    /*
    for (let i = 0; i < NumberofCards; i++) {
        const selectedOptionName = "selectedOption" + NumberofCards;
        cardElements.push(<Card selectedOption={selectedOption1}/>);
        //select from list
        //cardElements.push(<Card selectedOption={selectedOptions[NumberofCards-1]}/>);
    }*/
    
    

    //console.log(variables);
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

    const { initCardHandComponent } = CardHandComponent()
    useEffect(() => {
        initCardHandComponent();
    }, [])

    const [translate, setTranslate] = useState({
        x: 0,
        y: 0
    });

    const handleDragMove = (e) => {
        setTranslate({
            x: translate.x + e.movementX,
            y: translate.y + e.movementY
        });
    };

    const handleSetSelectedOption = e => {
      setSelectedOption(e.value);
    }

    const handleSetSelectedOption2 = e => {
      setSelectedOption2(e.value);
    }

    const handleSetSelectedOption3 = e => {
      setSelectedOption3(e.value);
    }

    const handleSetSelectedOptionsList = (selectedOption, index) => {
        if (selectedOption) {
            const updatedOptionsList = [...selectedOptions];
            updatedOptionsList[index] = selectedOption.value;
            console.log(updatedOptionsList);
            setSelectedOptionsList(updatedOptionsList);
        }
    };

    const handleSelectedOptionsListChange = (id) => {
        setSelectedOptionsList((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item} : item
            )
        );
    };

    const handleIncNumberofCards = () => {
      if (NumberofCards < 10) {
          setNumberofCards(NumberofCards + 1)
      }
  }

  const handleDecNumberofCards = () => {
      if (NumberofCards > 0) {
        setNumberofCards(NumberofCards - 1)
      }
  }
  
    return (
        <div>
            <button className="floating" onClick={toggle}>Select Hand</button>
            <div className={`cards-row ${showCardSelector ? 'hidden' : ''}`}>
                <table>
                    <tr>
                        <td>
                            <p>Number of Cards</p>
                            <button onClick={handleIncNumberofCards}>+</button>
                            <button onClick={handleDecNumberofCards}>-</button>
                            <p>{NumberofCards}</p>
                        </td>
                        {cardElements1.map((cardElement, index) => (
                            <td class="narrowTd">
                                <Select
                                    className="cards"
                                    defaultValue={selectedOptions[index]}
                                    onChange={(selectedOption) => handleSetSelectedOptionsList(selectedOption, index)}
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
                      ))}
                      <td>
                          <cardDivs
                              className="card-divs"
                              state="1"
                          />
                      </td>
                    </tr>
                    <tr>
                        <td></td>
                        {cardElements2.map((cardElement, index) => (
                            <td class="narrowTd">
                                <Select
                                    className="cards"
                                    defaultValue={selectedOptions[index + 5]}
                                    onChange={(selectedOption) => handleSetSelectedOptionsList(selectedOption, index + 5)}
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
                        ))}
                    </tr>
                </table>
            </div>

            <div className={`cardshand cards-${NumberofCards}`}>
                {selectedOptions.map((item, index) => (
                    <Card selectedOption={item}/>
                ))}
            </div>
        </div>
    );
};

export default CardHandBoard;