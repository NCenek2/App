import React from "react";
import { FaBook, FaEdit, FaTrash, FaKeyboard } from "react-icons/fa";

const Deck = ({ deckId, title, description, cardAmount, selectDeck }) => {
  const [deleteClicked, setDeleteClicked] = React.useState(false);
  const handleDeckClick = (e) => {
    selectDeck(e, deckId);
    setDeleteClicked(false);
  };

  return (
    <article className="deck-container card bg-light text-black">
      <h2 className="deck-title">{title.substring(0, 25)}</h2>
      <p className="deck-description">
        {description.length <= 50
          ? description
          : description.substring(0, 50) + "..."}
      </p>
      <p className="deck-count">Cards: {cardAmount}</p>
      <div className="deck-button-container">
        <button className="deck-btn" name="study" onClick={handleDeckClick}>
          <FaBook className="deck-icon" />
        </button>
        <button className="deck-btn" name="write" onClick={handleDeckClick}>
          <FaKeyboard className="deck-icon" />
        </button>
        <button className="deck-btn" name="edit" onClick={handleDeckClick}>
          <FaEdit className="deck-icon" />
        </button>
        <button
          className="deck-btn"
          name="delete"
          onClick={
            deleteClicked ? handleDeckClick : () => setDeleteClicked(true)
          }
        >
          <FaTrash
            className="deck-icon"
            style={deleteClicked && { color: "red" }}
          />
        </button>
      </div>
    </article>
  );
};

export default Deck;
