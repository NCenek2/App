import React, { useContext } from "react";
import Deck from "./Deck";
import QuizletContext from "./QuizletProvider";

const Decks = () => {
  const {
    decks,
    setDecks,
    setStudySelected,
    setEditSelected,
    setQuizSelected,
    setCurrentDeckId,
  } = useContext(QuizletContext);

  const selectDeck = (e, deckId) => {
    const { name } = e.target;

    if (name == "study") {
      if (decks[deckId].cards.length == 0) return;
      setStudySelected(true);
    } else if (name == "edit") {
      setEditSelected(true);
    } else if (name == "write") {
      if (decks[deckId].cards.length == 0) return;
      setQuizSelected(true);
    } else {
      console.log("DELETING for filter");

      // Handles Name Delete for Double Click of Trash Icon
      const newDeck = decks.filter(
        (prevDeck, prevDeckIndex) => prevDeckIndex != deckId
      );
      console.log(newDeck);
      setDecks(newDeck);
      return;
    }

    setCurrentDeckId(deckId);
  };

  const addDeck = () => {
    let deckId = decks.length;

    setDecks([
      ...decks,
      {
        title: "",
        description: "",
        cards: [],
      },
    ]);

    setEditSelected(true);
    setCurrentDeckId(deckId);
  };

  return (
    <section className="decks-container">
      {decks.length > 0 ? (
        decks.map((deck, index) => {
          const { title, description, cards } = deck;
          const cardAmount = cards.length;
          return (
            <Deck
              key={index}
              deckId={index}
              title={title}
              description={description}
              cardAmount={cardAmount}
              selectDeck={selectDeck}
            />
          );
        })
      ) : (
        <h1 className="text-white text-center no-decks">No Decks</h1>
      )}
      <button
        type="button"
        className="btn add-color add-deck"
        onClick={addDeck}
      >
        Add Deck
      </button>
    </section>
  );
};

export default Decks;
