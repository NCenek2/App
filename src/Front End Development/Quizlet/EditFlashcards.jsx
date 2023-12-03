import React, { useContext } from "react";
import EditFlashcard from "./EditFlashcard";
import QuizletContext from "./QuizletProvider";

const EditFlashCards = () => {
  const { decks, currentDeckId, setDecks, exitSession } =
    useContext(QuizletContext);

  const handleAdd = () => {
    const prevDecks = [...decks];
    prevDecks[currentDeckId].cards = prevDecks[currentDeckId].cards.filter(
      (card) => card.term !== "" && card.definition !== ""
    );
    // Adds card to deck
    prevDecks[currentDeckId].cards = [
      ...prevDecks[currentDeckId].cards,
      {
        term: "",
        definition: "",
      },
    ];
    // Prevents Empty Duplicates

    setDecks([...prevDecks]);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    const prevDecks = [...decks];
    decks[currentDeckId][id] = value;

    setDecks([...prevDecks]);
  };

  return (
    <section className="edit-flashcards-section">
      <h1 className="edit-title">Edit</h1>
      <button
        className="btn section-color add-deck"
        onClick={() => exitSession(currentDeckId)}
      >
        Home
      </button>
      <div className="edit-flashcards-info">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          className="edit-flashcards-title quizlet-inputs"
          value={decks[currentDeckId].title}
          spellCheck="false"
          onChange={handleChange}
        />
      </div>
      <div className="edit-flashcards-info">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          className="edit-flashcards-description quizlet-inputs"
          value={decks[currentDeckId].description}
          spellCheck="false"
          onChange={handleChange}
        />
      </div>
      <div
        className={`${
          decks[currentDeckId].cards.length === 1
            ? "edit-flashcards-container-single"
            : "edit-flashcards-container"
        }`}
      >
        {decks[currentDeckId].cards.map((currentCard, index) => {
          const { term, definition } = currentCard;
          return (
            <EditFlashcard
              key={index}
              cardId={index}
              term={term}
              definition={definition}
            />
          );
        })}
      </div>
      <button className="btn add-color add-deck" onClick={handleAdd}>
        Add
      </button>
    </section>
  );
};

export default EditFlashCards;
