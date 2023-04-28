import React from "react";

const EditFlashcard = ({ cardId, deckId, term, definition, setDecks }) => {
  const handleChange = (e) => {
    const { id, value } = e.target;
    setDecks((prevDecks) => {
      prevDecks[deckId].cards[cardId][id] = value;
      return [...prevDecks];
    });
  };

  const handleDelete = () => {
    setDecks((prevDecks) => {
      prevDecks[deckId].cards.splice(cardId, 1);
      return [...prevDecks];
    });
  };

  return (
    <article className="card bg-light edit-flashcard-container">
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
