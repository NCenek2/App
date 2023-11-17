import React from "react";

const StudyCards = ({ decks, deckId, exitSession }) => {
  const [cards, setCards] = React.useState(decks[deckId].cards);
  const [showTerm, setShowTerm] = React.useState(true);
  const [index, setIndex] = React.useState(0);

  const prevCard = () => {
    setIndex((prevIndex) => {
      if (prevIndex - 1 < 0) return prevIndex;
      return prevIndex - 1;
    });
    setShowTerm(true);
  };

  const nextCard = () => {
    setIndex((prevIndex) => {
      if (prevIndex + 1 >= cards.length) return prevIndex;
      return prevIndex + 1;
    });
    setShowTerm(true);
  };

  const handleTerm = () => {
    setShowTerm((p) => !p);
  };

  return (
    <section className="studycards-container">
      <h1 className="studycards-title">Study</h1>
      <button
        className="btn section-color studycards-home-btn"
        onClick={() => exitSession(deckId)}
      >
        Home
      </button>
      <React.Fragment>
        <article
          className="card bg-light text-black studycard-container"
          onClick={() => handleTerm()}
        >
          <p>
            Card: {index + 1}/{cards.length}
          </p>
          {showTerm ? (
            <h2>{cards[index].term}</h2>
          ) : (
            <p>{cards[index].definition}</p>
          )}
        </article>
        <div className="studycards-buttons-container">
          <button
            className="studycards-button btn btn-outline-light"
            onClick={prevCard}
          >
            Prev
          </button>
          <button
            className="studycards-button btn btn-outline-light"
            onClick={nextCard}
          >
            Next
          </button>
        </div>
      </React.Fragment>
    </section>
  );
};

export default StudyCards;
