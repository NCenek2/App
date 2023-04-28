import React from "react";
import Deck from "./Deck";

const Decks = ({
  decks,
  setDecks,
  setStudySelected,
  setEditSelected,
  setQuizSelected,
  setCurrentDeckId,
}) => {
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
      return setDecks((prevDecks) =>
        prevDecks.filter((prevDeck, prevDeckIndex) => prevDeckIndex != deckId)
      );
    }
    setCurrentDeckId(deckId);
  };

  const addDeck = () => {
    let deckId = decks.length;
    setDecks((prevDecks) => {
      return [
        ...prevDecks,
        {
          title: "",
          description: "",
          cards: [],
        },
      ];
    });
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
      <button className="btn btn-primary add-deck" onClick={addDeck}>
        Add Deck
      </button>
    </section>
  );
};

export default Decks;
