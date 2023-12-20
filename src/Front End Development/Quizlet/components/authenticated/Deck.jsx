import React, { useState } from "react";
import useModeContext, {
  ModeContextType,
  ModeEnum,
} from "../../contexts/ModeContext";
import { useNavigate } from "react-router-dom";
import useDeckContext from "../../contexts/DeckContext";

// { deck_id, deck_name, description, cardCount, selectDeck }

const Deck = ({ deck_id, deck_index, deck_name, cardCount }) => {
  const { setMode, setCurrentDeckId } = useModeContext();
  const { decks, setDecks } = useDeckContext();
  const [deleteClicked, setDeleteClicked] = useState(false);
  const navigate = useNavigate();

  const handleDeckClick = (newMode) => {
    if (newMode !== ModeEnum.EDIT && cardCount < 1) return;

    setMode(newMode);
    setCurrentDeckId(deck_index);
    setDeleteClicked(false);
  };

  const deleteDeck = async () => {
    const newDeck = decks.filter((deck, index) => index != deck_index);
    setDecks(newDeck);
  };

  const handleDeleteClicked = () => {
    if (!deleteClicked) return setDeleteClicked(true);
    setDeleteClicked(false);
    deleteDeck();
  };

  return (
    <article className="deck-container  bg-light text-black">
      <h3 className="deck-title">{deck_name.substring(0, 25)}</h3>
      <p className="deck-count">Cards: {cardCount}</p>
      <div className="deck-button-container">
        <button
          className="btn deck-btn"
          name="study"
          onClick={() => handleDeckClick(ModeEnum.STUDY)}
        >
          Study
        </button>
        <button
          className="btn deck-btn"
          name="write"
          onClick={() => handleDeckClick(ModeEnum.WRITE)}
        >
          Write
        </button>
        <button
          className="btn deck-btn"
          name="edit"
          onClick={() => handleDeckClick(ModeEnum.EDIT)}
        >
          Edit
        </button>
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
