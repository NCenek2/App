import React from "react";

const Flashcard = ({ term, definition }) => {
  return (
    <article>
      <h2>{term}</h2>
      <p>{definition}</p>
    </article>
  );
};

export default Flashcard;
