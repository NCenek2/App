import React, { useEffect, useState } from "react";
import EditFlashcard from "./EditFlashcard";
import {
  CARD_DEFINITION_LENGTH,
  CARD_TERM_LENGTH,
  DECK_NAME_LENGTH,
} from "../../constants";
import useDeckService from "../../hooks/services/useDeckService";
import { useAlert } from "../../hooks/useAlert";
import { Card, NewCard } from "../../contexts/CardContext";
import useCard from "../../hooks/useCard";
import useDeck from "../../hooks/useDeck";

let updatedSet = new Set<number>();
let deletedSet = new Set<number>();

const EditFlashCards = () => {
  const { cards, madeChanges, setMadeChanges, resetCards } = useCard();
  const { currentDeck, exitMode } = useDeck();
  const { updateDecks } = useDeckService();
  const { setAlert } = useAlert();

  const [currentCards, setCurrentCards] = useState<NewCard[]>(
    cards.filter((card) => card.deck_id === currentDeck?.deck_id)
  );

  useEffect(() => {
    setCurrentCards(
      cards.filter((card) => card.deck_id === currentDeck?.deck_id)
    );
    updatedSet = new Set<number>();
    deletedSet = new Set<number>();
    resetCards();
  }, [cards]);

  const [deckTitle, setDeckTitle] = useState(
    currentDeck !== null ? currentDeck.deck_name : ""
  );

  if (currentDeck == null) {
    return <h1>Deck is null</h1>;
  }

  const hasIncompleteCards = () => {
    const incompleteCards = currentCards.some(
      (card) => card.term.trim() === "" || card.definition.trim() === ""
    );

    if (incompleteCards) {
      setAlert("Card Term and Definitions cannot be empty");
    }
    return incompleteCards;
  };

  const titleExceedsLength = () => {
    const exceedsLength = deckTitle.length > DECK_NAME_LENGTH;

    if (exceedsLength) {
      setAlert(`Deck name cannot exceed ${DECK_NAME_LENGTH} characters`);
    }

    return exceedsLength;
  };

  const termOrDefinitionExceedsLength = () => {
    let cardLengthExceeded = false;

    for (let card of currentCards) {
      if (card.term.length > CARD_TERM_LENGTH) {
        cardLengthExceeded = true;
        setAlert(
          `Card with term '${card.term}' exceeds the term length of ${CARD_TERM_LENGTH} `
        );
        break;
      }

      if (card.definition.length > CARD_DEFINITION_LENGTH) {
        cardLengthExceeded = true;
        setAlert(
          `Card with term '${card.term}' exceeds the defintion length of ${CARD_DEFINITION_LENGTH} `
        );
        break;
      }
    }

    return cardLengthExceeded;
  };

  const handleAdd = () => {
    if (hasIncompleteCards()) return;

    const { deck_id } = currentDeck;

    let newCard: NewCard = {
      deck_id,
      card_id: Date.now().toString(),
      term: "",
      definition: "",
    };

    // For cases where we are patching from deleted cards
    if (deletedSet.size > 0) {
      for (let item of deletedSet) {
        updatedSet.add(item);
        deletedSet.delete(item);
        newCard.card_id = item;
        break;
      }
    }

    setMadeChanges(true);
    setCurrentCards((prevCurrentCards) => [...prevCurrentCards, newCard]);
  };

  const handleUpdate = async () => {
    if (
      hasIncompleteCards() ||
      titleExceedsLength() ||
      termOrDefinitionExceedsLength()
    )
      return;

    let created: NewCard[] = [];
    let updated: Card[] = [];

    const { deck_id } = currentDeck;
    const deck_name_old = "";

    for (let card of currentCards) {
      const { card_id, term, definition } = card;
      if (typeof card_id === "string") {
        created.push({
          deck_id,
          card_id,
          term,
          definition,
        });
      } else if (updatedSet.has(card.card_id as number)) {
        updated.push(card as Card);
      }
    }

    const deckData = { deck_id, deck_name: deckTitle, deck_name_old };
    await updateDecks({ deckData, deletedSet, updated, created });

    setMadeChanges(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMadeChanges(true);
    setDeckTitle(e.target.value);
  };

  function exitSession() {
    exitMode();
    resetCards();
  }

  return (
    <section className="edit-flashcards-section">
      <button className="btn btn-outline-light add-deck" onClick={exitSession}>
        Home
      </button>
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
          currentCards.length === 1
            ? "edit-flashcards-container-single"
            : "edit-flashcards-container"
        }`}
      >
        {currentCards.map((currentCard, index) => {
          const { card_id } = currentCard;
          return (
            <EditFlashcard
              key={card_id}
              {...currentCard}
              card_index={index}
              setCurrentCards={setCurrentCards}
              updatedSet={updatedSet}
              deletedSet={deletedSet}
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
