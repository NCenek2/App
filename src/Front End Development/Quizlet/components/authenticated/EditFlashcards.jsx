import React, { useState } from "react";
import EditFlashcard from "./EditFlashcard";
import useDeckContext from "../../contexts/DeckContext";
import ErrorAlert from "./ErrorAlert";
import useModeContext from "../../contexts/ModeContext";
import {
  CARD_DEFINITION_LENGTH,
  CARD_TERM_LENGTH,
  DECK_NAME_LENGTH,
} from "../../constants";

const EditFlashCards = () => {
  const { decks, setDecks } = useDeckContext();
  const { currentDeckId, exitSession, cards, setCards } = useModeContext();
  const [madeChanges, setMadeChanges] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [deckTitle, setDeckTitle] = useState(
    currentDeckId !== null ? decks[currentDeckId].deck_name : ""
  );

  if (currentDeckId == null) {
    return <h1>Deck Id is null</h1>;
  }

  const hasIncompleteCards = () => {
    const incompleteCards = cards.some(
      (card) => card.term.trim() === "" && card.definition.trim() === ""
    );

    if (incompleteCards) {
      setErrorMessage("Card Term and Definitions cannot be empty");
      setShowErrorMessage(true);
    }
    return incompleteCards;
  };

  const titleExceedsLength = () => {
    const exceedsLength = deckTitle.length > DECK_NAME_LENGTH;

    if (exceedsLength) {
      setErrorMessage(`Deck name cannot exceed ${DECK_NAME_LENGTH} characters`);
      setShowErrorMessage(true);
    }

    return exceedsLength;
  };

  const termOrDefinitionExceedsLength = () => {
    let cardLengthExceeded = false;

    for (let card of cards) {
      if (card.term.length > CARD_TERM_LENGTH) {
        cardLengthExceeded = true;
        setErrorMessage(
          `Card with term '${card.term}' exceeds the term length of ${CARD_TERM_LENGTH} `
        );
        break;
      }

      if (card.definition.length > CARD_DEFINITION_LENGTH) {
        cardLengthExceeded = true;
        setErrorMessage(
          `Card with term '${card.term}' exceeds the defintion length of ${CARD_DEFINITION_LENGTH} `
        );
        break;
      }
    }

    if (cardLengthExceeded) setShowErrorMessage(true);
    return cardLengthExceeded;
  };

  const handleAdd = () => {
    if (hasIncompleteCards()) return;

    let newCard = {
      card_id: new Date().getTime(),
      term: "",
      definition: "",
    };

    setMadeChanges(true);
    setCards([...cards, newCard]);
  };

  const handleUpdate = () => {
    if (
      hasIncompleteCards() ||
      titleExceedsLength() ||
      termOrDefinitionExceedsLength()
    )
      return;

    const deck_id = decks[currentDeckId].deck_id;
    const newDecks = decks.map((deck) => {
      if (deck.deck_id !== deck_id) return deck;
      deck.deck_name = deckTitle;
      deck.cards = cards;
      return deck;
    });

    setDecks(newDecks);
    setMadeChanges(false);
  };

  const handleChange = (e) => {
    setMadeChanges(true);
    setDeckTitle((prevTitle) => e.target.value);
  };

  return (
    <section className="edit-flashcards-section">
      <button className="btn btn-outline-light add-deck" onClick={exitSession}>
        Home
      </button>
      {showErrorMessage && (
        <ErrorAlert
          errorMessage={errorMessage}
          setShowErrorMessage={setShowErrorMessage}
        />
      )}
      {madeChanges && (
        <button className="btn add-color update-btn" onClick={handleUpdate}>
          Update
        </button>
      )}
      <input
        className="edit-flashcards-title"
        value={deckTitle}
        spellCheck="false"
        onChange={handleChange}
        maxLength={DECK_NAME_LENGTH}
      />
      <div
        className={`${
          cards.length === 1
            ? "edit-flashcards-container-single"
            : "edit-flashcards-container"
        }`}
      >
        {cards.map((currentCard, index) => {
          const { term, definition } = currentCard;
          return (
            <EditFlashcard
              key={index}
              card_index={index}
              setMadeChanges={setMadeChanges}
              setCards={setCards}
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
