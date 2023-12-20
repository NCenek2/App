import React from "react";
import { CARD_DEFINITION_LENGTH, CARD_TERM_LENGTH } from "../../constants";

const EditFlashcard = ({
  term,
  definition,
  card_index,
  setCards,
  setMadeChanges,
}) => {
  const handleChange = (event) => {
    setMadeChanges(true);

    const { id, value } = event.target;

    setCards((prevCards) => {
      const newCards = [...prevCards];
      newCards[card_index][id] = value;
      return [...newCards];
    });
  };

  const handleDelete = () => {
    setCards((prevCards) =>
      prevCards.filter((card, index) => index !== card_index)
    );
    setMadeChanges(true);
  };

  return (
    <article className="card edit-flashcard-container">
      <label htmlFor="term">Term: </label>
      <input
        id="term"
        value={term}
        onChange={handleChange}
        className="quizlet-inputs"
        maxLength={CARD_TERM_LENGTH}
      />
      <br />
      <label htmlFor="definition">Definition: </label>
      <textarea
        id="definition"
        className="edit-flashcard-definition quizlet-inputs"
        value={definition}
        onChange={handleChange}
        maxLength={CARD_DEFINITION_LENGTH}
      ></textarea>
      <br />
      <button className="btn btn-red" onClick={handleDelete}>
        Delete
      </button>
    </article>
  );
};

export default EditFlashcard;
