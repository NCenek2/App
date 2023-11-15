import React from "react";

const EditFlashcard = ({ cardId, deckId, term, definition, setDecks }) => {
  const handleChange = (e) => {
    const { id, value } = e.target;
    setDecks((prevDecks) => {
      prevDecks[deckId].cards[cardId][id] = value;

      const newDeck = [...prevDecks];
      localStorage.setItem("cards", JSON.stringify(newDeck));
      return newDeck;
    });
  };

  const handleDelete = () => {
    setDecks((prevDecks) => {
      prevDecks[deckId].cards.splice(cardId, 1);

      const newDeck = [...prevDecks];
      localStorage.setItem("cards", JSON.stringify(newDeck));
      return newDeck;
    });
  };

  return (
    <article className="card edit-flashcard-container">
      <label htmlFor="term">Term: </label>
      <input
        id="term"
        value={term}
        onChange={handleChange}
        className="quizlet-inputs"
      />
      <br />
      <label htmlFor="definition">Definition: </label>
      <textarea
        id="definition"
        className="edit-flashcard-definition quizlet-inputs"
        value={definition}
        onChange={handleChange}
      ></textarea>
      <br />
      <button className="btn btn-danger" onClick={() => handleDelete()}>
        Delete
      </button>
    </article>
  );
};

export default EditFlashcard;
