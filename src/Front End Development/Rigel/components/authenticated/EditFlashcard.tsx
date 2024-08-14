import React, { Dispatch } from "react";
import { CARD_DEFINITION_LENGTH, CARD_TERM_LENGTH } from "../../constants";
import { NewCard } from "../../contexts/CardContext";
import useCard from "../../hooks/useCard";

type EditFlashCardProps = {
  card_index: number;
  setCurrentCards: Dispatch<React.SetStateAction<NewCard[]>>;
  updatedSet: Set<number>;
  deletedSet: Set<number>;
};

const EditFlashcard = ({
  card_id,
  term,
  definition,
  card_index,
  setCurrentCards,
  updatedSet,
  deletedSet,
}: NewCard & EditFlashCardProps) => {
  const { setMadeChanges } = useCard();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMadeChanges(true);

    if (typeof card_id !== "string" && !updatedSet.has(card_id)) {
      updatedSet.add(card_id);
    }

    const { id, value } = e.target;

    setCurrentCards((prevCards) => {
      const newCards: NewCard[] = [...prevCards];

      const newCard = { ...newCards[card_index], [id]: value };
      newCards[card_index] = newCard;
      return newCards;
    });
  };

  const handleDelete = () => {
    setMadeChanges(true);
    // For cases where we are not using an existing id
    if (typeof card_id === "string") {
      setCurrentCards((prevCards) =>
        prevCards.filter((card) => card.card_id !== card_id)
      );
    } else {
      // For Cases where we are deleting a card with an id
      setCurrentCards((prevCards) =>
        prevCards.filter((card) => card.card_id !== card_id)
      );

      if (updatedSet.has(card_id)) {
        // Removes those that are updated to allow for an
        // easier distribution when i send the data to
        // server.
        updatedSet.delete(card_id);
      }

      deletedSet.add(card_id);
    }
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
      />
      <br />
      <button className="btn btn-red" onClick={handleDelete}>
        Delete
      </button>
    </article>
  );
};

export default EditFlashcard;
