import React, { createContext, useContext, useState, useEffect } from "react";
import useDeckContext from "./DeckContext";
import useLocalStorage from "../../../hooks/useLocalStorage";

const STUDY = "STUDY";
const EDIT = "EDIT";
const WRITE = "WRITE";

export const ModeEnum = {
  STUDY,
  EDIT,
  WRITE,
};

const ModeContext = createContext(null);

const useModeContext = () => {
  return useContext(ModeContext);
};

export const ModeProvider = ({ children }) => {
  const { decks } = useDeckContext();
  const [mode, setMode] = useState(null);
  const [currentDeckId, setCurrentDeckId] = useState(null);
  const [cards, setCards] = useLocalStorage("cards", []);

  useEffect(() => {
    if (currentDeckId !== null) {
      setCards(decks[currentDeckId].cards);
    }
  }, [decks, currentDeckId]);

  const exitSession = () => {
    setCurrentDeckId(null);
    setMode(null);
  };

  return (
    <ModeContext.Provider
      value={{
        mode,
        setMode,
        currentDeckId,
        setCurrentDeckId,
        cards,
        setCards,
        exitSession,
      }}
    >
      {children}
    </ModeContext.Provider>
  );
};

export default useModeContext;
