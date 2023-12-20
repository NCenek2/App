import React, { createContext, useContext } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";

const DeckContext = createContext(null);

const useDeckContext = () => {
  return useContext(DeckContext);
};

export const CardProvider = ({ children }) => {
  const [decks, setDecks] = useLocalStorage("decks", []);

  return (
    <DeckContext.Provider value={{ decks, setDecks }}>
      {children}
    </DeckContext.Provider>
  );
};

export default useDeckContext;
