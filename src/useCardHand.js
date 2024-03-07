import { useState, useEffect } from 'react';

export function useCardHand(props) {
    const [options, setOptions] =  useState([]);

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
      
      return { options };
}