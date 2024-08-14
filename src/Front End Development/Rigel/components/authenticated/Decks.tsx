import React from "react";
import Deck from "./Deck";
import { Deck as DeckType } from "../../contexts/DeckContext";
import useDeck from "../../hooks/useDeck";
import useDeckService from "../../hooks/services/useDeckService";
const Decks = () => {
  const { decks } = useDeck();
  const { addDeck } = useDeckService();
  const handleDeckCreation = async () => {
    addDeck();
  };

  return (
    <section className="decks-container">
      {decks.length > 0 ? (
        decks.map((deck: DeckType) => {
          const { deck_id } = deck;
          return <Deck key={deck_id} {...deck} />;
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
