import React from "react";
import EditFlashcard from "./EditFlashcard";

const EditFlashCards = ({ decks, deckId, setDecks, exitSession }) => {
  const handleAdd = () => {
    setDecks((prevDecks) => {
      // Prevents Empty Duplicates
      prevDecks[deckId].cards = prevDecks[deckId].cards.filter(
        (card) => card.term !== "" && card.definition !== ""
      );
      // Adds card to deck
      prevDecks[deckId].cards = [
        ...prevDecks[deckId].cards,
        {
          term: "",
          definition: "",
        },
      ];
      return [...prevDecks];
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setDecks((prevDecks) => {
      decks[deckId][id] = value;
      return [...prevDecks];
    });
  };

  return (
    <section className="edit-flashcards-container">
      <h1 className="edit-title">Edit</h1>
      <button className="btn btn-secondary" onClick={() => exitSession(deckId)}>
        Home
      </button>
      <div className="edit-flashcards-info">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          className="edit-flashcards-title quizlet-inputs"
          value={decks[deckId].title}
          spellCheck="false"
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <input
          id="description"
          className="edit-flashcards-description quizlet-inputs"
          value={decks[deckId].description}
          spellCheck="false"
          onChange={handleChange}
        />
      </div>

      {/* // Description: Title: {decks[deckId].title} */}
      {decks[deckId].cards.map((currentCard, index) => {
        const { term, definition } = currentCard;
        return (
          <EditFlashcard
            key={index}
            cardId={index}
            deckId={deckId}
            term={term}
            definition={definition}
            setDecks={setDecks}
          />
        );
      })}
      <button className="btn btn-primary" onClick={() => handleAdd()}>
        Add
      </button>
    </section>
  );
};

export default EditFlashCards;
