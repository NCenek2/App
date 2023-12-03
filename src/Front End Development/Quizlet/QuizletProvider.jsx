import React, { createContext, useContext, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import DefaultDeck from "./DefaultCards.json";

const QuizletContext = createContext();

export const QuizletProvider = ({ children }) => {
  const [studySelected, setStudySelected] = useState(false);
  const [editSelected, setEditSelected] = useState(false);
  const [quizSelected, setQuizSelected] = useState(false);
  const [currentDeckId, setCurrentDeckId] = useState(null);

  const [decks, setDecks] = useLocalStorage("decks", DefaultDeck);

  const exitSession = () => {
    const newDeck = decks.filter(
      (prevDeck) => prevDeck.title !== "" || prevDeck.description !== ""
    );

    const finalDeck = newDeck.map((prevDeck) => {
      prevDeck.cards = prevDeck.cards.filter(
        (card) => card.term !== "" && card.definition !== ""
      );
      return prevDeck;
    });

    setDecks(finalDeck);
    setStudySelected(false);
    setEditSelected(false);
    setQuizSelected(false);
    setCurrentDeckId(null);
  };

  return (
    <QuizletContext.Provider
      value={{
        decks,
        setDecks,
        studySelected,
        setStudySelected,
        editSelected,
        setEditSelected,
        quizSelected,
        setQuizSelected,
        currentDeckId,
        setCurrentDeckId,
        exitSession,
      }}
    >
      {children}
    </QuizletContext.Provider>
  );
};

export default QuizletContext;
