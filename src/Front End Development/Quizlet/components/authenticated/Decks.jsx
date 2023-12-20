import React, { useState } from "react";
import Deck from "./Deck";
import { DECK_NAME_LENGTH } from "../../constants";
import { axiosPrivate } from "../../api/axios";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import useDeckContext from "../../contexts/DeckContext";
const Decks = () => {
  const { decks, setDecks } = useDeckContext();

  const [showError, setShowError] = useState(false);
  const [errorMessage, SetErrorMessage] = useState("");

  const handleDeckCreation = async () => {
    const newDate = new Date().getTime();
    const newDeckName = `Deck ${newDate}`;

    setDecks([
      ...decks,
      { deck_id: newDate, deck_name: newDeckName, cards: [] },
    ]);
  };

  return (
    <section className="decks-container">
      {decks.length > 0 ? (
        decks.map((deck, deck_index) => {
          const { deck_id, deck_name, cards } = deck;
          return (
            <Deck
              key={deck_index}
              deck_index={deck_index}
              deck_id={deck_id}
              deck_name={deck_name}
              cardCount={cards?.length !== null ? cards.length : 0}
            />
          );
        })
      ) : (
        <h1 className="text-white text-center no-decks">No Decks</h1>
      )}

      {decks.length < 5 && (
        <button
          type="button"
          className="btn btn-dark add-color add-deck pos-rel"
          onClick={handleDeckCreation}
        >
          Add Deck
        </button>
      )}
    </section>
  );
};

export default Decks;
