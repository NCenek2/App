import React, { useContext } from "react";
import QuizletContext from "./QuizletProvider";

const EditFlashcard = ({ cardId, term, definition }) => {
  const { decks, setDecks, currentDeckId } = useContext(QuizletContext);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const prevDecks = [...decks];
    prevDecks[currentDeckId].cards[cardId][id] = value;
    setDecks([...prevDecks]);
  };

  const handleDelete = () => {
    const prevDecks = [...decks];
    prevDecks[currentDeckId].cards.splice(cardId, 1);
    setDecks([...prevDecks]);
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
      <button className="btn delete-color" onClick={handleDelete}>
        Delete
      </button>
    </article>
  );
};

export default EditFlashcard;
