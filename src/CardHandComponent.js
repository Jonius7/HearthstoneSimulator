import React, { useState, useEffect } from 'react';
import Select from "react-select";
import cards from './cards.json';


const CardHandComponent = (props) => {
    const [options, setOptions] =  useState([]);

    const initCardHandComponent = () => {
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
    }

    return { initCardHandComponent }
}


export default CardHandComponent;