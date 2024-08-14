import React, { useState } from "react";
import useDeckService from "../../hooks/services/useDeckService";
import { Deck as DeckType } from "../../contexts/DeckContext";
import { Link } from "react-router-dom";
import useDeck from "../../hooks/useDeck";

const Deck = (deck: DeckType) => {
  const { deck_id, deck_name, card_count } = deck;
  const { deleteDeck } = useDeckService();
  const [deleteClicked, setDeleteClicked] = useState(false);
  const { setCurrentDeck } = useDeck();

  const handleDeleteClicked = () => {
    if (!deleteClicked) return setDeleteClicked(true);
    setDeleteClicked(false);
    deleteDeck(deck_id);
  };

  function handleModeClick() {
    setCurrentDeck(deck);
  }

  return (
    <article className="deck-container  bg-light text-black">
      <h3 className="deck-title">{deck_name.substring(0, 25)}</h3>
      <p className="deck-count">Cards: {card_count}</p>
      <div className="deck-button-container">
        {card_count > 0 && (
          <>
            <Link
              className="btn deck-btn"
              to={"study"}
              onClick={handleModeClick}
            >
              Study
            </Link>
            <Link
              className="btn deck-btn"
              to={"write"}
              onClick={handleModeClick}
            >
              Write
            </Link>
          </>
        )}
        <Link className="btn deck-btn" to={"edit"} onClick={handleModeClick}>
          Edit
        </Link>
        <button
          className={`btn deck-btn ${deleteClicked && "deck-btn-delete"}`}
          name="delete"
          onClick={handleDeleteClicked}
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default Deck;
