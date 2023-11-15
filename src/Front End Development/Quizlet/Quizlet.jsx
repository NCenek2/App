import React from "react";
import Decks from "./Decks";
import EditFlashCards from "./EditFlashcards";
import StudyCards from "./StudyCards";
import Write from "./Write";
import DefaultCards from "./DefaultCards.json";
import "./Quizlet.css";

const Quizlet = () => {
  const [studySelected, setStudySelected] = React.useState(false);
  const [editSelected, setEditSelected] = React.useState(false);
  const [quizSelected, setQuizSelected] = React.useState(false);
  const [currentDeckId, setCurrentDeckId] = React.useState(null);
  const cards = localStorage.getItem("cards");
  const [decks, setDecks] = React.useState(
    cards != null ? JSON.parse(cards) : DefaultCards
  );

  const handleExitSession = () => {
    setDecks((prevDecks) => {
      const newDeck = prevDecks.filter(
        (prevDeck) => prevDeck.title !== "" || prevDeck.description !== ""
      );
      localStorage.setItem("cards", JSON.stringify(newDeck));
      return newDeck;
    });

    setDecks((prevDecks) => {
      prevDecks.map((prevDeck) => {
        prevDeck.cards = prevDeck.cards.filter(
          (card) => card.term !== "" && card.definition !== ""
        );
        return prevDeck;
      });

      localStorage.setItem("cards", JSON.stringify(prevDecks));
      return prevDecks;
    });

    setStudySelected(false);
    setEditSelected(false);
    setQuizSelected(false);
    setCurrentDeckId(null);
  };

  return (
    <main className="quizlet-container">
      {editSelected ? (
        <EditFlashCards
          decks={decks}
          deckId={currentDeckId}
          setDecks={setDecks}
          exitSession={handleExitSession}
        />
      ) : studySelected ? (
        <StudyCards
          decks={decks}
          deckId={currentDeckId}
          exitSession={handleExitSession}
        />
      ) : quizSelected ? (
        <Write
          decks={decks}
          deckId={currentDeckId}
          exitSession={handleExitSession}
        />
      ) : (
        <Decks
          decks={decks}
          setDecks={setDecks}
          setStudySelected={setStudySelected}
          setEditSelected={setEditSelected}
          setQuizSelected={setQuizSelected}
          setCurrentDeckId={setCurrentDeckId}
        />
      )}
    </main>
  );
};

export default Quizlet;
